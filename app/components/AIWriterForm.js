'use client'

import { useActionState } from "react"
import { generateText } from "../actions";

const initialState = {
    result: "",
    error: "",
};

export default function AIWriterForm() {
    const [state, formAction, isPending] = useActionState(
        generateText,
        initialState
    );

    return (
        <div className="space-y-6">
            <form action={formAction} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
                <div>
                    <label className="mb-2 block font-medium">
                        Enter your prompt
                    </label>
                    <div>
                        <label className="mb-2 block font-medium">
                            Choose Mode
                        </label>

                        <select
                            name="mode"
                            className="w-full rounded-lg border p-3"
                        >
                            <option value="email">Email Writer</option>
                            <option value="summary">Summarize</option>
                            <option value="improve">Improve Writing</option>
                        </select>
                    </div>

                    <textarea name="prompt" rows="6" maxLength={1000}
                        placeholder="Ecample: Write a short professional internship email."
                        className="w-full rounded-lg border p-3" />
                </div>

                {state.error && (
                    <p className="text-sm text-red-600">
                        {state.error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                >
                    {isPending ? "Generating..." : "Generate"}
                </button>
            </form>

            {state.result && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-3 text-lg font-semibold">
                        AI Response
                    </h2>

                    <p className="whitespace-pre-wrap text-gray-700">
                        {state.result}
                    </p>
                </div>
            )}
        </div>
    )
}