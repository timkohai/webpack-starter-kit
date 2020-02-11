export function importDefault(path) {
  return import(/* webpackChunkName: "[request]" */ `${path}`).then(function(module) {
    return module.default
  })
}