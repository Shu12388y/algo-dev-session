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
import { submitCode, runCode } from "../../services/api";
import { Loader2, Sun, Moon } from "lucide-react";
import { useState } from "react";

function CodeNavBar() {
  const navigator = useNavigate();
  const { theme, loading, code, language, questionID, code_snippet } =
    useSelector((state: RootState) => state.codeEditor);
  const dispatch = useDispatch<AppDispatch>();
  const [types, setTypes] = useState("run");

  const handleSubmission = async (type: string) => {
    if (type === "run") {
      setTypes("run");
      const obj = {
        language,
        source_code: code ? code : code_snippet,
        questionId: questionID,
      };
      await dispatch(runCode(obj)).unwrap();
    } else {
      setTypes("submit");
      const obj = {
        language,
        source_code: code ? code : code_snippet,
        questionId: questionID,
      };
      await dispatch(submitCode(obj)).unwrap();
    }
  };

  return (
    <div className="flex flex-row w-full items-center justify-between p-4 mt-18">
      <div>
        <Button onClick={() => navigator("-1")}>Go Back</Button>
      </div>
      <div className=" flex flex-row items-center justify-between gap-5">
        <div>
          <Select
            onValueChange={(e) => {
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
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </div>
        <div>
          {loading && types === "run" ? (
            <div className="animate-spin">
              <Loader2 />
            </div>
          ) : (
            <Button onClick={() => handleSubmission("run")}>Run</Button>
          )}
        </div>
        <div>
          {loading && types === "submit" ? (
            <div className="animate-spin">
              <Loader2 />
            </div>
          ) : (
            <Button onClick={() => handleSubmission("submit")}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeNavBar;
