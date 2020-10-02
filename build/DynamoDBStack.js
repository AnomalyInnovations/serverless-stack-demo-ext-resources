"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@aws-cdk/core");

var dynamodb = _interopRequireWildcard(require("@aws-cdk/aws-dynamodb"));

var sst = _interopRequireWildcard(require("@serverless-stack/resources"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const app = this.node.root;
    const table = new dynamodb.Table(this, "Table", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      sortKey: {
        name: "noteId",
        type: dynamodb.AttributeType.STRING
      },
      partitionKey: {
        name: "userId",
        type: dynamodb.AttributeType.STRING
      }
    }); // Output values

    new _core.CfnOutput(this, "TableName", {
      value: table.tableName,
      exportName: app.logicalPrefixedName("TableName")
    });
    new _core.CfnOutput(this, "TableArn", {
      value: table.tableArn,
      exportName: app.logicalPrefixedName("TableArn")
    });
  }

}

exports.default = DynamoDBStack;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9EeW5hbW9EQlN0YWNrLmpzIl0sIm5hbWVzIjpbIkR5bmFtb0RCU3RhY2siLCJzc3QiLCJTdGFjayIsImNvbnN0cnVjdG9yIiwic2NvcGUiLCJpZCIsInByb3BzIiwiYXBwIiwibm9kZSIsInJvb3QiLCJ0YWJsZSIsImR5bmFtb2RiIiwiVGFibGUiLCJiaWxsaW5nTW9kZSIsIkJpbGxpbmdNb2RlIiwiUEFZX1BFUl9SRVFVRVNUIiwic29ydEtleSIsIm5hbWUiLCJ0eXBlIiwiQXR0cmlidXRlVHlwZSIsIlNUUklORyIsInBhcnRpdGlvbktleSIsIkNmbk91dHB1dCIsInZhbHVlIiwidGFibGVOYW1lIiwiZXhwb3J0TmFtZSIsImxvZ2ljYWxQcmVmaXhlZE5hbWUiLCJ0YWJsZUFybiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFZSxNQUFNQSxhQUFOLFNBQTRCQyxHQUFHLENBQUNDLEtBQWhDLENBQXNDO0FBQ25EQyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUUMsRUFBUixFQUFZQyxLQUFaLEVBQW1CO0FBQzVCLFVBQU1GLEtBQU4sRUFBYUMsRUFBYixFQUFpQkMsS0FBakI7QUFFQSxVQUFNQyxHQUFHLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxJQUF0QjtBQUVBLFVBQU1DLEtBQUssR0FBRyxJQUFJQyxRQUFRLENBQUNDLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUIsT0FBekIsRUFBa0M7QUFDOUNDLE1BQUFBLFdBQVcsRUFBRUYsUUFBUSxDQUFDRyxXQUFULENBQXFCQyxlQURZO0FBRTlDQyxNQUFBQSxPQUFPLEVBQUU7QUFBRUMsUUFBQUEsSUFBSSxFQUFFLFFBQVI7QUFBa0JDLFFBQUFBLElBQUksRUFBRVAsUUFBUSxDQUFDUSxhQUFULENBQXVCQztBQUEvQyxPQUZxQztBQUc5Q0MsTUFBQUEsWUFBWSxFQUFFO0FBQUVKLFFBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUVQLFFBQVEsQ0FBQ1EsYUFBVCxDQUF1QkM7QUFBL0M7QUFIZ0MsS0FBbEMsQ0FBZCxDQUw0QixDQVc1Qjs7QUFDQSxRQUFJRSxlQUFKLENBQWMsSUFBZCxFQUFvQixXQUFwQixFQUFpQztBQUMvQkMsTUFBQUEsS0FBSyxFQUFFYixLQUFLLENBQUNjLFNBRGtCO0FBRS9CQyxNQUFBQSxVQUFVLEVBQUVsQixHQUFHLENBQUNtQixtQkFBSixDQUF3QixXQUF4QjtBQUZtQixLQUFqQztBQUlBLFFBQUlKLGVBQUosQ0FBYyxJQUFkLEVBQW9CLFVBQXBCLEVBQWdDO0FBQzlCQyxNQUFBQSxLQUFLLEVBQUViLEtBQUssQ0FBQ2lCLFFBRGlCO0FBRTlCRixNQUFBQSxVQUFVLEVBQUVsQixHQUFHLENBQUNtQixtQkFBSixDQUF3QixVQUF4QjtBQUZrQixLQUFoQztBQUlEOztBQXJCa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSBcIkBhd3MtY2RrL2F3cy1keW5hbW9kYlwiO1xuaW1wb3J0ICogYXMgc3N0IGZyb20gXCJAc2VydmVybGVzcy1zdGFjay9yZXNvdXJjZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1vREJTdGFjayBleHRlbmRzIHNzdC5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlLCBpZCwgcHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGFwcCA9IHRoaXMubm9kZS5yb290O1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgXCJUYWJsZVwiLCB7XG4gICAgICBiaWxsaW5nTW9kZTogZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgc29ydEtleTogeyBuYW1lOiBcIm5vdGVJZFwiLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwidXNlcklkXCIsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG5cbiAgICAvLyBPdXRwdXQgdmFsdWVzXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlRhYmxlTmFtZVwiLCB7XG4gICAgICB2YWx1ZTogdGFibGUudGFibGVOYW1lLFxuICAgICAgZXhwb3J0TmFtZTogYXBwLmxvZ2ljYWxQcmVmaXhlZE5hbWUoXCJUYWJsZU5hbWVcIiksXG4gICAgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlRhYmxlQXJuXCIsIHtcbiAgICAgIHZhbHVlOiB0YWJsZS50YWJsZUFybixcbiAgICAgIGV4cG9ydE5hbWU6IGFwcC5sb2dpY2FsUHJlZml4ZWROYW1lKFwiVGFibGVBcm5cIiksXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==