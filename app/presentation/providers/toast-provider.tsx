// import React, { useRef } from "react"
// import Toast, { useToast, ToastProvider as FastToastProvider } from "react-native-fast-toast"

// import { ToastContext } from "../contexts"
// import { useTheme, useTranslate } from "../hooks"

// import Icon from "react-native-vector-icons/Ionicons"
// import { ToastShowProps, PlacementProps } from "../common/types"
// import { getHeightSize } from "~/application/common/utils"
// import { TxKeyPath } from "../main/i18nold"

// const ToastProvider: React.FC = ({ children }) => {
//   const toast = useRef(null)

//   const toastUse = useToast()
//   const verification = useVerification()

//   const { format } = useTranslate()

//   const { signOut } = useAuth()

//   const {
//     colors: { green },
//   } = useTheme()

//   const isUnauthorizedTrait = (message: string): boolean =>
//     message === format("errors.expiredSession")

//   const show = async (
//     { message }: { message: TxKeyPath | string },
//     type: ToastShowProps,
//     placement?: PlacementProps,
//   ) => {
//     if (verification.getState()) return
//     const isUnauthorized = isUnauthorizedTrait(message)

//     const tryFormat = format(message as TxKeyPath)
//     const newMessage = tryFormat.startsWith("[missing") ? message : tryFormat
//     toastUse.show(newMessage, {
//       successColor: green,
//       textStyle: { fontSize: getHeightSize(15), paddingRight: 25 },
//       successIcon: <Icon name={"checkmark-circle"} size={30} color="white" />,
//       style: {
//         width: "85%",
//         minHeight: getHeightSize(50),
//         paddingVertical: getHeightSize(10),
//         borderRadius: 10,
//       },
//       type,
//       placement: placement || "bottom",
//     })

//     if (isUnauthorized) {
//       signOut()
//     }
//   }

//   return (
//     <FastToastProvider>
//       <ToastContext.Provider
//         value={{
//           show,
//         }}
//       >
//         {children}
//         <Toast
//           ref={toast}
//           textStyle={{ fontSize: 20 }}
//           successColor={green}
//           successIcon={<Icon name={"checkmark-circle"} size={30} color="white" />}
//           style={{ width: "85%", height: 65, borderRadius: 10 }}
//           offset={30}
//         />
//       </ToastContext.Provider>
//     </FastToastProvider>
//   )
// }

// const FastToastProviderWrapper: React.FC = ({ children }) => (
//   <FastToastProvider>
//     <ToastProvider>{children}</ToastProvider>
//   </FastToastProvider>
// )

// export default FastToastProviderWrapper
export {}