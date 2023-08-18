import{createCourse} from "../controllers/course.controller"

const courseRoutes = app =>{
    //cadastrar time
    app.post("/course/create", createCourse)
}

export default courseRoutes