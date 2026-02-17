import adminRoute from "./routes/admin"
import authRoute from "./routes/auth"
import userRoute from "./routes/user"
import todoRoute from "./routes/todo"

app.use("/auth", authRoute)
app.use("/admin", adminRoute)
app.use("/user", userRoute)
app.use("/todo", todoRoute)