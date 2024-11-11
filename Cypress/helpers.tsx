const getWindowBounds = (window: Window): DOMRect => {
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
}

const isOutOfBounds = (inRect: DOMRect, outRect: DOMRect): boolean => {
    const isOut = inRect.left < outRect.left ||
    inRect.right > outRect.right ||
    inRect.bottom > outRect.bottom ||
    inRect.top < outRect.top;
    return isOut;
} 

const hasVerticalScroll = (document: Document): boolean => {
    const scrollingElement = document.scrollingElement;
    if (!scrollingElement) {
      return false;
    }
    const scrollHeight = scrollingElement.scrollHeight || 0;
    const clientHeight = scrollingElement.clientHeight || 0;
  
    return scrollHeight > clientHeight;
}

const hasHorizontalScroll = (document: Document): boolean => {
  const scrollingElement = document.scrollingElement;
  if (!scrollingElement) {
    return false;
  }
  const scrollWidth = scrollingElement.scrollWidth || 0;
  const clientWidth = scrollingElement.clientWidth || 0;


  return scrollWidth > clientWidth;
}

const ALIGNMENT_THRESHOLD = 9;

enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Undefined = 'undefined',
  SingleChild = 'single-child',

  StrictGrid = 'strict-grid',
}

enum Alignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',

  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',

  Undefined = 'undefined',
}

const isHorizontal = (node1: DOMRect, node2: DOMRect): boolean => {
  let horizontal = false;
  if (node1.x + node1.width <= node2.x || node2.x + node2.width <= node1.x)
    horizontal = true;
  return horizontal;
}

const isVertical = (node1: DOMRect, node2: DOMRect): boolean => {
  let vertical = false;
  if (
    node1.y + node1.height <= node2.y ||
    node2.y + node2.height <= node1.y
  ) {
    vertical = true;
  }
  return vertical;
}

const approxEqual = (
    a: number,
    b: number,
    threshold: number = ALIGNMENT_THRESHOLD,
  ): boolean => {
    return Math.abs(a - b) <= threshold;
  }

const determinePairLayout = (
  node1: DOMRect,
  node2: DOMRect,
): Layout => {
  const horizontal = isHorizontal(node1, node2);

  const vertical = isVertical(node1, node2);

  if (horizontal && !vertical) {
    return Layout.Horizontal;
  } else if (!horizontal && vertical) {
    return Layout.Vertical;
  } else {
    return Layout.Undefined;
  }
}


const determinePairAlignment = (
  node1: DOMRect,
  node2: DOMRect,
  layout: Layout,
): Alignment => {
  if (layout === Layout.Horizontal && node1.left === node2.left) {
    if (
      approxEqual(node1.y + node1.height / 2, node2.y + node2.height / 2)
    ) {
      return Alignment.Middle;
    }
    if (approxEqual(node1.y, node2.y)) {
      return Alignment.Top;
    }
    if (approxEqual(node1.y + node1.height, node2.y + node2.height)) {
      return Alignment.Bottom;
    }
  } else if (layout === Layout.Vertical && node1.left === node2.left) {
    if (
      approxEqual(node1.x + node1.width / 2, node2.x + node2.width / 2)
    ) {
      return Alignment.Center;
    }
    if (approxEqual(node1.x, node2.x)) {
      return Alignment.Left;
    }
    if (approxEqual(node1.x + node1.width, node2.x + node2.width)) {
      return Alignment.Right;
    }
  }
  return Alignment.Undefined;
}

export { getWindowBounds, isOutOfBounds, hasVerticalScroll, hasHorizontalScroll, determinePairLayout, determinePairAlignment, Layout, Alignment };