/* eslint-disable @typescript-eslint/ban-ts-comment */
import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import { Group, Panel, Separator } from "react-resizable-panels";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/index";
import CodeNavBar from "../../../components/codenavbar/codeNavBar";
import Assistant from "./assistant";
import LoadingPage from "../../../components/loading/loading";
import ErrorPage from "../../../components/error/error";
import { generateQuestion } from "../../../services/api";
import { useEffect } from "react";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
  );
}

const markdownStyles = {
  h1: "text-3xl font-bold text-gray-900 mb-4",
  h2: "text-2xl font-semibold text-gray-800 mt-6 mb-3",
  h3: "text-xl font-semibold text-gray-700 mt-4 mb-2",
  p: "text-base text-gray-600 leading-relaxed mb-4",
  li: "list-disc ml-6 text-gray-600 mb-2",
  strong: "font-bold text-gray-900",
  code: "bg-slate-900 text-white px-2 py-1 rounded",
  img: "w-full h-auto my-6 rounded-lg shadow-md",
  a: "text-blue-600 hover:text-blue-800 underline",
};

function Index() {
  const { code_snippet, language, theme } = useSelector(
    (state: RootState) => state.codeEditor,
  );
  const { loading, data, error } = useSelector((state: RootState) => state.ai);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(generateQuestion()).unwrap();
  }, []);
  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="relative">
        <Assistant />
        <CodeNavBar />
        <Group orientation="horizontal" className="min-h-screen">
          <Panel minSize={30} defaultSize={45}>
            <div className="h-full overflow-y-auto bg-white border-r p-6">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-4">
                    {" "}
                    {
                      JSON.parse(
                        // {/* @ts-ignore */}
                        data?.replace(/```[a-zA-Z]*\n?/g, "").trim(),
                      ).title
                    }
                  </h1>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {/* {data?.data?.categories?.split(',').map((cat: string) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-1 rounded-full bg-slate-100 border"
                  >
                    {cat.trim()}
                  </span>
                ))} */}
                  </div>
                  <Markdown
                    options={{
                      overrides: {
                        h1: {
                          component: "h1",
                          props: { className: markdownStyles.h1 },
                        },
                        h2: {
                          component: "h2",
                          props: { className: markdownStyles.h2 },
                        },
                        h3: {
                          component: "h3",
                          props: { className: markdownStyles.h3 },
                        },
                        p: {
                          component: "p",
                          props: { className: markdownStyles.p },
                        },
                        strong: {
                          component: "strong",
                          props: { className: markdownStyles.strong },
                        },
                        li: {
                          component: "li",
                          props: { className: markdownStyles.li },
                        },
                        a: {
                          component: "a",
                          props: { className: markdownStyles.a },
                        },
                        img: {
                          component: "img",
                          props: { className: markdownStyles.img },
                        },
                        code: {
                          component: "code",
                          props: { className: "text-black" },
                        },
                      },
                    }}
                  >
                    {/* @ts-ignore  */}

                    {
                      JSON.parse(
                        // @ts-ignore 
                        data?.replace(/```[a-zA-Z]*\n?/g, "").trim(),
                      ).content
                    }
                  </Markdown>
                </>
              )}
            </div>
          </Panel>

          <Separator className="w-1 bg-slate-300 hover:bg-slate-500 cursor-col-resize transition" />

          <Panel minSize={40} defaultSize={55}>
            <Group orientation="vertical" className="h-full">
              <Panel minSize={60} defaultSize={70}>
                <div className="h-full flex flex-col bg-[#1e1e1e]">
                  {loading ? (
                    <div className="p-6">
                      <Skeleton className="h-[60vh] w-full" />
                    </div>
                  ) : (
                    <Editor
                      height="100%"
                      language={language}
                      // onChange={(e) => dispatch()}
                      theme={theme}
                      value={code_snippet}
                      defaultValue={code_snippet}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                        padding: { top: 12 },
                      }}
                    />
                  )}
                </div>
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </>
  );
}

export default Index;
