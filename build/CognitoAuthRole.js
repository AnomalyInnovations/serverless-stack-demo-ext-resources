"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var cdk = _interopRequireWildcard(require("@aws-cdk/core"));

var iam = _interopRequireWildcard(require("@aws-cdk/aws-iam"));

var cognito = _interopRequireWildcard(require("@aws-cdk/aws-cognito"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CognitoAuthRole extends cdk.Construct {
  // Public reference to the IAM role
  constructor(scope, id, props) {
    super(scope, id);

    _defineProperty(this, "role", void 0);

    const {
      identityPool
    } = props; // IAM role used for authenticated users

    this.role = new iam.Role(this, "cognitoDefaultAuthenticatedRole", {
      assumedBy: new iam.FederatedPrincipal("cognito-identity.amazonaws.com", {
        StringEquals: {
          "cognito-identity.amazonaws.com:aud": identityPool.ref
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }, "sts:AssumeRoleWithWebIdentity")
    });
    this.role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["mobileanalytics:PutEvents", "cognito-sync:*", "cognito-identity:*"],
      resources: ["*"]
    }));
    new cognito.CfnIdentityPoolRoleAttachment(this, "identityPoolRoleAttachment", {
      identityPoolId: identityPool.ref,
      roles: {
        authenticated: this.role.roleArn
      }
    });
  }

}

exports.default = CognitoAuthRole;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9Db2duaXRvQXV0aFJvbGUuanMiXSwibmFtZXMiOlsiQ29nbml0b0F1dGhSb2xlIiwiY2RrIiwiQ29uc3RydWN0IiwiY29uc3RydWN0b3IiLCJzY29wZSIsImlkIiwicHJvcHMiLCJpZGVudGl0eVBvb2wiLCJyb2xlIiwiaWFtIiwiUm9sZSIsImFzc3VtZWRCeSIsIkZlZGVyYXRlZFByaW5jaXBhbCIsIlN0cmluZ0VxdWFscyIsInJlZiIsImFkZFRvUG9saWN5IiwiUG9saWN5U3RhdGVtZW50IiwiZWZmZWN0IiwiRWZmZWN0IiwiQUxMT1ciLCJhY3Rpb25zIiwicmVzb3VyY2VzIiwiY29nbml0byIsIkNmbklkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50IiwiaWRlbnRpdHlQb29sSWQiLCJyb2xlcyIsImF1dGhlbnRpY2F0ZWQiLCJyb2xlQXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRWUsTUFBTUEsZUFBTixTQUE4QkMsR0FBRyxDQUFDQyxTQUFsQyxDQUE0QztBQUN6RDtBQUdBQyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUUMsRUFBUixFQUFZQyxLQUFaLEVBQW1CO0FBQzVCLFVBQU1GLEtBQU4sRUFBYUMsRUFBYjs7QUFENEI7O0FBRzVCLFVBQU07QUFBRUUsTUFBQUE7QUFBRixRQUFtQkQsS0FBekIsQ0FINEIsQ0FLNUI7O0FBQ0EsU0FBS0UsSUFBTCxHQUFZLElBQUlDLEdBQUcsQ0FBQ0MsSUFBUixDQUFhLElBQWIsRUFBbUIsaUNBQW5CLEVBQXNEO0FBQ2hFQyxNQUFBQSxTQUFTLEVBQUUsSUFBSUYsR0FBRyxDQUFDRyxrQkFBUixDQUNULGdDQURTLEVBRVQ7QUFDRUMsUUFBQUEsWUFBWSxFQUFFO0FBQ1osZ0RBQXNDTixZQUFZLENBQUNPO0FBRHZDLFNBRGhCO0FBSUUsa0NBQTBCO0FBQ3hCLGdEQUFzQztBQURkO0FBSjVCLE9BRlMsRUFVVCwrQkFWUztBQURxRCxLQUF0RCxDQUFaO0FBY0EsU0FBS04sSUFBTCxDQUFVTyxXQUFWLENBQ0UsSUFBSU4sR0FBRyxDQUFDTyxlQUFSLENBQXdCO0FBQ3RCQyxNQUFBQSxNQUFNLEVBQUVSLEdBQUcsQ0FBQ1MsTUFBSixDQUFXQyxLQURHO0FBRXRCQyxNQUFBQSxPQUFPLEVBQUUsQ0FDUCwyQkFETyxFQUVQLGdCQUZPLEVBR1Asb0JBSE8sQ0FGYTtBQU90QkMsTUFBQUEsU0FBUyxFQUFFLENBQUMsR0FBRDtBQVBXLEtBQXhCLENBREY7QUFZQSxRQUFJQyxPQUFPLENBQUNDLDZCQUFaLENBQ0UsSUFERixFQUVFLDRCQUZGLEVBR0U7QUFDRUMsTUFBQUEsY0FBYyxFQUFFakIsWUFBWSxDQUFDTyxHQUQvQjtBQUVFVyxNQUFBQSxLQUFLLEVBQUU7QUFBRUMsUUFBQUEsYUFBYSxFQUFFLEtBQUtsQixJQUFMLENBQVVtQjtBQUEzQjtBQUZULEtBSEY7QUFRRDs7QUE1Q3dEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSBcIkBhd3MtY2RrL2F3cy1pYW1cIjtcbmltcG9ydCAqIGFzIGNvZ25pdG8gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2duaXRvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvZ25pdG9BdXRoUm9sZSBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuICAvLyBQdWJsaWMgcmVmZXJlbmNlIHRvIHRoZSBJQU0gcm9sZVxuICByb2xlO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlLCBpZCwgcHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgeyBpZGVudGl0eVBvb2wgfSA9IHByb3BzO1xuXG4gICAgLy8gSUFNIHJvbGUgdXNlZCBmb3IgYXV0aGVudGljYXRlZCB1c2Vyc1xuICAgIHRoaXMucm9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCBcImNvZ25pdG9EZWZhdWx0QXV0aGVudGljYXRlZFJvbGVcIiwge1xuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLkZlZGVyYXRlZFByaW5jaXBhbChcbiAgICAgICAgXCJjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAge1xuICAgICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICAgXCJjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YXVkXCI6IGlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIkZvckFueVZhbHVlOlN0cmluZ0xpa2VcIjoge1xuICAgICAgICAgICAgXCJjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yXCI6IFwiYXV0aGVudGljYXRlZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RzOkFzc3VtZVJvbGVXaXRoV2ViSWRlbnRpdHlcIlxuICAgICAgKSxcbiAgICB9KTtcbiAgICB0aGlzLnJvbGUuYWRkVG9Qb2xpY3koXG4gICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIGVmZmVjdDogaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIFwibW9iaWxlYW5hbHl0aWNzOlB1dEV2ZW50c1wiLFxuICAgICAgICAgIFwiY29nbml0by1zeW5jOipcIixcbiAgICAgICAgICBcImNvZ25pdG8taWRlbnRpdHk6KlwiLFxuICAgICAgICBdLFxuICAgICAgICByZXNvdXJjZXM6IFtcIipcIl0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBuZXcgY29nbml0by5DZm5JZGVudGl0eVBvb2xSb2xlQXR0YWNobWVudChcbiAgICAgIHRoaXMsXG4gICAgICBcImlkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50XCIsXG4gICAgICB7XG4gICAgICAgIGlkZW50aXR5UG9vbElkOiBpZGVudGl0eVBvb2wucmVmLFxuICAgICAgICByb2xlczogeyBhdXRoZW50aWNhdGVkOiB0aGlzLnJvbGUucm9sZUFybiB9LFxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==