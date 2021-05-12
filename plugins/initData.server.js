export default async ({ store }) => {
    await store.dispatch("todo/callData");
    await store.dispatch("status/setStatus");
};