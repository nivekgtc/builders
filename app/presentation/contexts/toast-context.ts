import { createContext } from "react"
import { ToastContextProps } from "../common/types"

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps)

export default ToastContext
