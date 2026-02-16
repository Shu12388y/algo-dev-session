/* eslint-disable @typescript-eslint/ban-ts-comment */
import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import { Group, Panel, Separator } from "react-resizable-panels";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/index";
import CodeNavBar from "../../components/codenavbar/codeNavBar";
import { useEffect } from "react";
import { problem } from "../../services/api";
import ErrorPage from "../../components/error/error";

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
  const { id } = useParams();
  const { code_snippet, language, theme } = useSelector(
    (state: RootState) => state.codeEditor,
  );
  const { loading, error, problemData } = useSelector(
    (state: RootState) => state.problems,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      // @ts-ignore
      dispatch(problem(id as string)).unwrap();
    }
  }, [id, dispatch]);

  if (error) {
    return <ErrorPage />;
  }
  // console.log(problemData.data)

  return (
    <>
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
                  {/* @ts-ignore */}
                  {problemData?.data?.title}
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
                  {problemData?.data?.content}
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

            <Separator className="h-1 bg-slate-600 hover:bg-slate-400 cursor-row-resize transition" />

            <Panel minSize={20} defaultSize={60}>
              <div className="h-full bg-slate-100 text-black flex flex-col">
                {/* Header */}
                <div className="px-4 py-2 border-b border-slate-900 text-sm font-semibold">
                  Test Cases
                </div>

                {loading ? (
                  <div className="p-4 space-y-4">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-1/3 mt-4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <div className="p-4 space-y-5 overflow-y-auto text-sm">
                    {/* -------- Test Input -------- */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Input</span>
                      </div>

                      <textarea
                        value={// @ts-ignore
                        problemData?.data?.input_test_case?.trim()}
                        rows={4}
                        className="w-full resize-none rounded-md bg-slate-50 text-black border border-slate-700 p-3 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter test input here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <span className="text-blacl font-medium mb-1">
                          Expected Output
                        </span>

                        <pre className="rounded-md bg-slate-100 border border-slate-700 p-3 font-mono whitespace-pre-wrap">
                          {/* @ts-ignore  */}
                          {problemData?.data?.input_test_expected_output_case ||
                            "No output provided"}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
    </>
  );
}

export default Index;
