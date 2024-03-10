
export interface Controller<TInput, TOutput> {
  handle: (input: TInput) => Promise<TOutput>
}