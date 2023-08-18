import userRoutes from "./user.routes";
import teamRoutes from "./team.routes";
import emails from "./sendEmail";
import courseRoutes from "./course.routes";

const routes = app =>{
    userRoutes(app)
    teamRoutes(app)
    emails(app)
    courseRoutes(app)
}

export default routes