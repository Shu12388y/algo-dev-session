import { z } from "zod";

export const question_validator = z.object({
  title: z.string(),
  content: z.string(),
  input_test_case: z.string(),
  input_test_expected_output_case: z.string(),
  input_case: z.string(),
  output_case: z.string(),
  type: z.enum(["easy", "medium", "hard"]),
});
