export const applyTransition = async (states: any, transition: any) => {
  const {operation, params} = transition;
  console.log(`operation: ${operation}, params: ${JSON.stringify(params)}`);

  switch (operation) {
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};

export default {};
