import { Container } from "inversify"
import { ApiModule, ApplicationModule, InfraModule } from "./modules"

const container = new Container()

container.load(...ApiModule, ...InfraModule, ...ApplicationModule)

export { container }
