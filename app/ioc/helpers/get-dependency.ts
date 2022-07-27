import { interfaces } from "inversify"
import { container } from "~/ioc/ioc.config"

export const getDependency = <T>(dependency: interfaces.ServiceIdentifier<T>) => {
  try {
    return container.get<T>(dependency)
  } catch (error: unknown) {
    return container.resolve<T>(dependency as interfaces.Newable<T>)
  }
}
