import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties
} from "react";
import {
  type ColumnMeta,
  type Header,
  flexRender
} from "@tanstack/react-table";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


import {
  Menu,
  MenuContent,
  MenuTrigger,
  MenuItem
} from "./menu/menu.tsx";
import { MENU_ALIGN, MENU_SIZE } from "./menu/constant.ts";
import { DEFAULT_KEYS, UPDATED_EVENTS } from "../constant";
import { useTable } from "./tablecontext";
import { tableHeaderVariants, tableHeaderCellVariants } from "../variants/table";
import { cn } from "../utils/cn";

interface HeaderOptionsProps {
  id: string;
  value: string;
  onClick: () => void;
}

interface ExtendedColumnMeta extends ColumnMeta<object, unknown> {
  enableOrdering?: boolean;
  headerOptions?: Array<HeaderOptionsProps>;
}

// then use it like this

export function TableHeader() {
  const { table, tableRef, classNames, density } = useTable();
  const { columnOrder } = table.getState();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event as {
        active: { id: string };
        over: { id: string };
      };
      if (active && over && active.id !== over.id) {
        tableRef.onColumnDrag(active.id, over.id);
        tableRef.updateTableData({
          type: UPDATED_EVENTS.COLUMN_DRAG,
          value: {
            fromId: active.id,
            toId: over.id
          }
        });
      }
    },
    [tableRef]
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <thead className={cn(tableHeaderVariants(), classNames?.header)}>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="bg-inherit flex w-full tableHeadRow"
          >
            <SortableContext
              items={columnOrder}
              strategy={horizontalListSortingStrategy}
            >
              {headerGroup.headers.map((header) => (
                <DraggableTableHeader key={header.id} header={header} />
              ))}
            </SortableContext>
          </tr>
        ))}
      </DndContext>
    </thead>
  );
}

function DraggableTableHeader({
  header
}: { header: Header<unknown, unknown> }) {
  const { tableRef, density } = useTable();

  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id
    });

  const isPinned = header.column.getIsPinned();
  const isLastLeftPinnedColumn = useMemo(
    () => isPinned === "left" && header.column.getIsLastColumn("left"),
    [isPinned, header.column]
  );

  const style: CSSProperties = {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px inset #b4b5b5"
      : undefined,
    left:
      isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
    right:
      isPinned === "right" ? `${header.column.getAfter("right")}px` : undefined,
    opacity: isDragging ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging || isPinned ? 11 : undefined
  };

  // const onColumnPinChange = useCallback(() => {
  //   const pinned = isPinned ? false : "left";
  //   header.column.pin(pinned);
  //   table.options.meta?.updateTableData({
  //     type: UPDATED_EVENTS.COLUMN_PIN,
  //     value: { columnId: header.column.id, pinned }
  //   });
  // }, [isPinned, header.column, table]);

  const isNonSelectableColumn = header.column.id !== DEFAULT_KEYS.SELECT;

  return (
    <th
      key={header.id}
      style={{ width: header.getSize(), ...style }}
      colSpan={header.colSpan}
      ref={setNodeRef}
      className={cn(tableHeaderCellVariants({ density }), classNames?.headerCell)}
    >
      <div
        className={`grid items-center w-full gap-12 ${isNonSelectableColumn ? "grid-cols-[auto_max-content_min-content]" : "grid-cols-1"} hover:cursor-grab ellipsis`}
      >
        <span
          className="flex items-center gap-2 cursor-grab ellipsis"
          {...(isNonSelectableColumn &&
          (header.column.columnDef.meta as ExtendedColumnMeta)?.enableOrdering
            ? { ...attributes, ...listeners }
            : {})}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </span>

        {isNonSelectableColumn &&
          (
            (header.column.columnDef.meta as ExtendedColumnMeta)
              ?.headerOptions || []
          )?.length > 0 && (
            <MenuAction
              headerOptions={
                (header.column.columnDef.meta as ExtendedColumnMeta)
                  .headerOptions as Array<HeaderOptionsProps>
              }
            />
          )}
      </div>
      {header.column.getCanResize() && (
        <div
          onDoubleClick={() => {
            header.column.resetSize();
            tableRef.updateTableData({
              type: UPDATED_EVENTS.COLUMN_RESIZE,
              value: {
                columnId: header.column.id,
                width: header.column.columnDef.size
              }
            });
          }}
          onMouseDown={header.getResizeHandler()}
          onMouseUp={() => {
            setTimeout(() => {
              const newWidth = header.getSize();
              tableRef.updateTableData({
                type: UPDATED_EVENTS.COLUMN_RESIZE,
                value: {
                  columnId: header.column.id,
                  width: newWidth
                }
              });
            }, 50);
          }}
          // onTouchStart={header.getResizeHandler()}
          className="absolute right-0 top-auto h-24 w-3 cursor-col-resize user-select-none touch-none rounded-8 bg-gray-alpha-25 hover:bg-primary-500"
        />
      )}
    </th>
  );
}

const MenuAction = ({
  headerOptions
}: { headerOptions: Array<HeaderOptionsProps> }) => {
  // const { tableRef } = useTable();

  const [menuActive, setMenuActive] = useState(false);
  const headerRef = useRef<HTMLSpanElement>(null);

  return (
    <span
      className={`${menuActive ? "visible" : "invisible"} relative group-hover:visible`}
      ref={headerRef}
    >
      <Menu
        size={MENU_SIZE.MEDIUM}
        onOpenChange={setMenuActive}
        open={menuActive}
      >
        <MenuTrigger>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-more-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </MenuTrigger>
        <MenuContent
          align={MENU_ALIGN.START}
          data-testid="menuContent"
          className="z-10"
          container={headerRef.current}
        >
          {headerOptions.map((menuitem: HeaderOptionsProps) => {
            return (
              <MenuItem key={menuitem.id} onClick={menuitem.onClick}>
                {menuitem.value}
              </MenuItem>
            );
          })}
        </MenuContent>
      </Menu>
    </span>
  );
};