import { TxKeyPath } from "~/presentation/main/i18"

export type ToastShowProps = "normal" | "success" | "warning" | "danger" | "custom"
export type PlacementProps = "top" | "bottom"

export type ToastContextProps = {
  show(
    { message }: { message: TxKeyPath | string },
    type: ToastShowProps,
    placement?: PlacementProps,
  ): void
}
