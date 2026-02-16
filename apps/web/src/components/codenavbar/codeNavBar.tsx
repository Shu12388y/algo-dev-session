import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../store/index";
import {
  toggleTheme,
  toggleLanguage,
} from "../../features/code_editor.feature";

function CodeNavBar() {
  const navigator = useNavigate();
  const { theme } = useSelector((state: RootState) => state.codeEditor);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-row w-full items-center justify-between p-4 mt-18">
      <div>
        <Button onClick={() => navigator("-1")}>Go Back</Button>
      </div>
      <div className=" flex flex-row items-center justify-between gap-5">
        <div>
          <Select
            onValueChange={(e) => {
              console.log(e);
              dispatch(toggleLanguage(e));
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">Cpp</SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            onClick={() =>
              dispatch(toggleTheme(theme === "light" ? "vs-dark" : "light"))
            }
          >
            Toogle Theme
          </Button>
        </div>
        <div>
          <Button>Run</Button>
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default CodeNavBar;
