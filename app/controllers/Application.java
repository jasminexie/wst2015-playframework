package controllers;

import models.Information;
import play.data.DynamicForm;
import play.data.Form;
import play.mvc.*;

import views.html.*;

import java.util.List;

public class Application extends Controller {

    public Result index() {
        return ok(index.render());
    }

    private List<Information> getAll(){
        return null;
    }

    public Result submit() {
        DynamicForm in = Form.form().bindFromRequest();
        String name = in.get("name");
        String age = in.get("age");
        String email = in.get("email");
        String gender = in.get("gender");
        validate(name,age,email,gender);
        return ok("Hello");
    }

    private String validate(String name, String age, String email, String gender){
        if (name == null || age == null || email == null || gender == null)
            return "No field may be empty!";
        return null;
    }

}
