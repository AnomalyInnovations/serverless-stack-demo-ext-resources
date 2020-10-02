"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _S3Stack = _interopRequireDefault(require("./S3Stack"));

var _CognitoStack = _interopRequireDefault(require("./CognitoStack"));

var _DynamoDBStack = _interopRequireDefault(require("./DynamoDBStack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add stacks
function main(app) {
  new _DynamoDBStack.default(app, "dynamodb");
  const s3 = new _S3Stack.default(app, "s3");
  new _CognitoStack.default(app, "cognito", {
    bucketArn: s3.bucket.bucketArn
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYWluIiwiYXBwIiwiRHluYW1vREJTdGFjayIsInMzIiwiUzNTdGFjayIsIkNvZ25pdG9TdGFjayIsImJ1Y2tldEFybiIsImJ1Y2tldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRUE7QUFDZSxTQUFTQSxJQUFULENBQWNDLEdBQWQsRUFBbUI7QUFDaEMsTUFBSUMsc0JBQUosQ0FBa0JELEdBQWxCLEVBQXVCLFVBQXZCO0FBRUEsUUFBTUUsRUFBRSxHQUFHLElBQUlDLGdCQUFKLENBQVlILEdBQVosRUFBaUIsSUFBakIsQ0FBWDtBQUVBLE1BQUlJLHFCQUFKLENBQWlCSixHQUFqQixFQUFzQixTQUF0QixFQUFpQztBQUFFSyxJQUFBQSxTQUFTLEVBQUVILEVBQUUsQ0FBQ0ksTUFBSCxDQUFVRDtBQUF2QixHQUFqQztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFMzU3RhY2sgZnJvbSBcIi4vUzNTdGFja1wiO1xuaW1wb3J0IENvZ25pdG9TdGFjayBmcm9tIFwiLi9Db2duaXRvU3RhY2tcIjtcbmltcG9ydCBEeW5hbW9EQlN0YWNrIGZyb20gXCIuL0R5bmFtb0RCU3RhY2tcIjtcblxuLy8gQWRkIHN0YWNrc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbihhcHApIHtcbiAgbmV3IER5bmFtb0RCU3RhY2soYXBwLCBcImR5bmFtb2RiXCIpO1xuXG4gIGNvbnN0IHMzID0gbmV3IFMzU3RhY2soYXBwLCBcInMzXCIpO1xuXG4gIG5ldyBDb2duaXRvU3RhY2soYXBwLCBcImNvZ25pdG9cIiwgeyBidWNrZXRBcm46IHMzLmJ1Y2tldC5idWNrZXRBcm4gfSk7XG59XG4iXX0=