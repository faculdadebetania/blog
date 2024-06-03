import Icon from "@components/ui/icon";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Pagination as UIPagination,
} from "@components/ui/pagination";

interface Props {
  count: number;
  page?: number;
  itemsPerPage?: number;
}
export default function usePagination(props: Props) {
  const { page = 1, count, itemsPerPage = 10 } = props;

  const pages = Math.ceil(count / itemsPerPage);

  const [first, midLeft, mid, midRight, last] = Array.from(Array(5).keys()).map(
    (n) => ({
      isVisible: n + 1 <= Math.min(pages, 5),
      isActive: isActive(n + 1),
      index: getIndex(n + 1),
    })
  );

  function isActive(n: number): boolean {
    if (n === 1) return page === 1;
    if (n === 2) return page === 2;
    if (n === 3)
      return (
        page === 3 ||
        (page > 3 && page < pages - 2) ||
        (pages > 4 && page === pages - 2)
      );
    if (n === 4) return pages > 4 ? page === pages - 1 : page === 4;
    if (n === 5) return page === pages;
    return false;
  }

  function getIndex(n: number): number {
    if (n === 1) return 1;
    if (n === 2)
      return page > 3 && page < pages - 2
        ? page - 1
        : pages > 4 && page > pages - 3
        ? pages - 3
        : 2;
    if (n === 3)
      return page > 3 && page < pages - 2
        ? page
        : pages > 4 && page > pages - 3
        ? pages - 2
        : 3;
    if (n === 4)
      return page > 3 && page < pages - 2
        ? page + 1
        : pages > 4 && page > pages - 3
        ? pages - 1
        : 4;
    if (n === 5) return pages;
    return n;
  }

  function Pagination() {
    return (
      <UIPagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationLink href={`/posts/${page - 1}`}>
                <Icon name="ChevronLeft" className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}

          {first.isVisible && (
            <PaginationItem>
              <PaginationLink
                href={`/posts/${first.index}`}
                isActive={first.isActive}
              >
                {first.index}
              </PaginationLink>
            </PaginationItem>
          )}

          {pages > 5 && page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {midLeft.isVisible && (
            <PaginationItem>
              <PaginationLink
                href={`/posts/${midLeft.index}`}
                isActive={midLeft.isActive}
              >
                {midLeft.index}
              </PaginationLink>
            </PaginationItem>
          )}

          {mid.isVisible && (
            <PaginationItem>
              <PaginationLink
                href={`/posts/${mid.index}`}
                isActive={mid.isActive}
              >
                {mid.index}
              </PaginationLink>
            </PaginationItem>
          )}

          {midRight.isVisible && (
            <PaginationItem>
              <PaginationLink
                href={`/posts/${midRight.index}`}
                isActive={midRight.isActive}
              >
                {midRight.index}
              </PaginationLink>
            </PaginationItem>
          )}

          {pages > 5 && page < pages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {last.isVisible && (
            <PaginationItem>
              <PaginationLink
                href={`/posts/${last.index}`}
                isActive={last.isActive}
              >
                {last.index}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < pages && (
            <PaginationItem>
              <PaginationLink href={`/posts/${page + 1}`}>
                <Icon name="ChevronRight" className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </UIPagination>
    );
  }

  return { Pagination };
}
