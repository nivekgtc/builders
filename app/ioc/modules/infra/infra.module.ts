import { ContainerModule } from "inversify"
import { InfraTypes } from "~/ioc/types"
import { HttpClient } from "~/application/protocols/http"
import { AxiosHttpClient } from "~/infra"

const InfraClientModule = new ContainerModule((bind) => {
  bind<HttpClient>(InfraTypes.HTTP_CLIENT).to(AxiosHttpClient).inSingletonScope()
})

export const InfraModule = [InfraClientModule]
