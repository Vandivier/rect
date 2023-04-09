"use strict"
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_api_src_users_queries_getCurrentUser_ts"
exports.ids = ["_api_src_users_queries_getCurrentUser_ts"]
exports.modules = {
  /***/ "(api)/./src/users/queries/getCurrentUser.ts":
    /*!*********************************************!*\
  !*** ./src/users/queries/getCurrentUser.ts ***!
  \*********************************************/
    /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! db */ "(api)/./db/index.ts");\n\nconst __internal_rpcHandler = async function getCurrentUser(_ = null, { session  }) {\n    if (!session.userId) return null;\n    const user = await db__WEBPACK_IMPORTED_MODULE_0__["default"].user.findFirst({\n        where: {\n            id: session.userId\n        },\n        select: {\n            id: true,\n            name: true,\n            email: true,\n            role: true\n        }\n    });\n    return user;\n};\n__internal_rpcHandler._resolverName = "getCurrentUser";\n__internal_rpcHandler._resolverType = "query";\n__internal_rpcHandler._routePath = "/api/rpc/getCurrentUser";\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXNlcnMvcXVlcmllcy9nZXRDdXJyZW50VXNlci50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUNtQjtBQUVuQixNQUFNQyx3QkFBd0IsZUFBZUMsZUFBZUMsSUFBSSxJQUFJLEVBQUUsRUFBRUMsUUFBTyxFQUFPLEVBQUU7SUFDdEYsSUFBSSxDQUFDQSxRQUFRQyxNQUFNLEVBQUUsT0FBTyxJQUFJO0lBRWhDLE1BQU1DLE9BQU8sTUFBTU4seURBQWlCLENBQUM7UUFDbkNRLE9BQU87WUFBRUMsSUFBSUwsUUFBUUMsTUFBTTtRQUFDO1FBQzVCSyxRQUFRO1lBQUVELElBQUksSUFBSTtZQUFFRSxNQUFNLElBQUk7WUFBRUMsT0FBTyxJQUFJO1lBQUVDLE1BQU0sSUFBSTtRQUFDO0lBQzFEO0lBRUEsT0FBT1A7QUFDVDtBQUdBTCxzQkFBc0JhLGFBQWEsR0FBRztBQUN0Q2Isc0JBQXNCYyxhQUFhLEdBQUc7QUFDdENkLHNCQUFzQmUsVUFBVSxHQUFHO0FBRW5DLGlFQUFlZixxQkFBcUJBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWN0Ly4vc3JjL3VzZXJzL3F1ZXJpZXMvZ2V0Q3VycmVudFVzZXIudHM/YTMyYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdHggfSBmcm9tICdibGl0eidcbmltcG9ydCBkYiBmcm9tICdkYidcblxuY29uc3QgX19pbnRlcm5hbF9ycGNIYW5kbGVyID0gYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoXyA9IG51bGwsIHsgc2Vzc2lvbiB9OiBDdHgpIHtcbiAgaWYgKCFzZXNzaW9uLnVzZXJJZCkgcmV0dXJuIG51bGxcblxuICBjb25zdCB1c2VyID0gYXdhaXQgZGIudXNlci5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXJJZCB9LFxuICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgZW1haWw6IHRydWUsIHJvbGU6IHRydWUgfSxcbiAgfSlcblxuICByZXR1cm4gdXNlclxufVxuXG5cbl9faW50ZXJuYWxfcnBjSGFuZGxlci5fcmVzb2x2ZXJOYW1lID0gJ2dldEN1cnJlbnRVc2VyJ1xuX19pbnRlcm5hbF9ycGNIYW5kbGVyLl9yZXNvbHZlclR5cGUgPSAncXVlcnknXG5fX2ludGVybmFsX3JwY0hhbmRsZXIuX3JvdXRlUGF0aCA9ICcvYXBpL3JwYy9nZXRDdXJyZW50VXNlcidcblxuZXhwb3J0IGRlZmF1bHQgX19pbnRlcm5hbF9ycGNIYW5kbGVyIl0sIm5hbWVzIjpbImRiIiwiX19pbnRlcm5hbF9ycGNIYW5kbGVyIiwiZ2V0Q3VycmVudFVzZXIiLCJfIiwic2Vzc2lvbiIsInVzZXJJZCIsInVzZXIiLCJmaW5kRmlyc3QiLCJ3aGVyZSIsImlkIiwic2VsZWN0IiwibmFtZSIsImVtYWlsIiwicm9sZSIsIl9yZXNvbHZlck5hbWUiLCJfcmVzb2x2ZXJUeXBlIiwiX3JvdXRlUGF0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/users/queries/getCurrentUser.ts\n'
      )

      /***/
    },
}
