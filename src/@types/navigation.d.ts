export interface ProductNavigationProps {
  id?: string;
}

export interface OrderNavigationProps {
  id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      products: ProductNavigationProps;
      order: OrderNavigationProps;
      orders: undefined;
    }
  }
}