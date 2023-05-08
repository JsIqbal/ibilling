import { Form, Field, ErrorMessage } from "formik";
import { Label } from "../../../core";

const LoginForm = ({ isSubmitting }: any) => {
    return (
        <Form>
            <div className="form-group">
                <Label className="fw-bold" htmlFor="email" title="email" />
                <Field
                    type="email"
                    name="email"
                    className="form-control "
                    placeholder="Enter email"
                />
                <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                />
            </div>
            <div className="form-group mb-2">
                <Label
                    className="fw-bold"
                    htmlFor="password"
                    title="Password"
                />
                <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
            >
                {isSubmitting ? "Loading..." : "Login"}
            </button>
        </Form>
    );
};

export default LoginForm;
