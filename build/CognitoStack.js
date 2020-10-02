"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@aws-cdk/core");

var iam = _interopRequireWildcard(require("@aws-cdk/aws-iam"));

var cognito = _interopRequireWildcard(require("@aws-cdk/aws-cognito"));

var sst = _interopRequireWildcard(require("@serverless-stack/resources"));

var _CognitoAuthRole = _interopRequireDefault(require("./CognitoAuthRole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class CognitoStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const {
      bucketArn
    } = props;
    const app = this.node.root;
    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      autoVerify: {
        email: true
      },
      signInAliases: {
        email: true
      } // Set email as an alias

    });
    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      generateSecret: false,
      authFlows: {
        adminUserPassword: false
      }
    });
    const identityPool = new cognito.CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: false,
      // Don't allow unathenticated users
      cognitoIdentityProviders: [{
        clientId: userPoolClient.userPoolClientId,
        providerName: userPool.userPoolProviderName
      }]
    });
    const authenticatedRole = new _CognitoAuthRole.default(this, "CognitoAuthRole", {
      identityPool
    });
    authenticatedRole.role.addToPolicy(new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*"]
    })); // Export values

    new _core.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId
    });
    new _core.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId
    });
    new _core.CfnOutput(this, "IdentityPoolId", {
      value: identityPool.ref
    });
    new _core.CfnOutput(this, "AuthenticatedRoleName", {
      value: authenticatedRole.role.roleName,
      exportName: app.logicalPrefixedName("CognitoAuthRole")
    });
  }

}

exports.default = CognitoStack;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9Db2duaXRvU3RhY2suanMiXSwibmFtZXMiOlsiQ29nbml0b1N0YWNrIiwic3N0IiwiU3RhY2siLCJjb25zdHJ1Y3RvciIsInNjb3BlIiwiaWQiLCJwcm9wcyIsImJ1Y2tldEFybiIsImFwcCIsIm5vZGUiLCJyb290IiwidXNlclBvb2wiLCJjb2duaXRvIiwiVXNlclBvb2wiLCJzZWxmU2lnblVwRW5hYmxlZCIsImF1dG9WZXJpZnkiLCJlbWFpbCIsInNpZ25JbkFsaWFzZXMiLCJ1c2VyUG9vbENsaWVudCIsIlVzZXJQb29sQ2xpZW50IiwiZ2VuZXJhdGVTZWNyZXQiLCJhdXRoRmxvd3MiLCJhZG1pblVzZXJQYXNzd29yZCIsImlkZW50aXR5UG9vbCIsIkNmbklkZW50aXR5UG9vbCIsImFsbG93VW5hdXRoZW50aWNhdGVkSWRlbnRpdGllcyIsImNvZ25pdG9JZGVudGl0eVByb3ZpZGVycyIsImNsaWVudElkIiwidXNlclBvb2xDbGllbnRJZCIsInByb3ZpZGVyTmFtZSIsInVzZXJQb29sUHJvdmlkZXJOYW1lIiwiYXV0aGVudGljYXRlZFJvbGUiLCJDb2duaXRvQXV0aFJvbGUiLCJyb2xlIiwiYWRkVG9Qb2xpY3kiLCJpYW0iLCJQb2xpY3lTdGF0ZW1lbnQiLCJhY3Rpb25zIiwiZWZmZWN0IiwiRWZmZWN0IiwiQUxMT1ciLCJyZXNvdXJjZXMiLCJDZm5PdXRwdXQiLCJ2YWx1ZSIsInVzZXJQb29sSWQiLCJyZWYiLCJyb2xlTmFtZSIsImV4cG9ydE5hbWUiLCJsb2dpY2FsUHJlZml4ZWROYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRWUsTUFBTUEsWUFBTixTQUEyQkMsR0FBRyxDQUFDQyxLQUEvQixDQUFxQztBQUNsREMsRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVFDLEVBQVIsRUFBWUMsS0FBWixFQUFtQjtBQUM1QixVQUFNRixLQUFOLEVBQWFDLEVBQWIsRUFBaUJDLEtBQWpCO0FBRUEsVUFBTTtBQUFFQyxNQUFBQTtBQUFGLFFBQWdCRCxLQUF0QjtBQUVBLFVBQU1FLEdBQUcsR0FBRyxLQUFLQyxJQUFMLENBQVVDLElBQXRCO0FBRUEsVUFBTUMsUUFBUSxHQUFHLElBQUlDLE9BQU8sQ0FBQ0MsUUFBWixDQUFxQixJQUFyQixFQUEyQixVQUEzQixFQUF1QztBQUN0REMsTUFBQUEsaUJBQWlCLEVBQUUsSUFEbUM7QUFFdERDLE1BQUFBLFVBQVUsRUFBRTtBQUFFQyxRQUFBQSxLQUFLLEVBQUU7QUFBVCxPQUYwQztBQUd0REMsTUFBQUEsYUFBYSxFQUFFO0FBQUVELFFBQUFBLEtBQUssRUFBRTtBQUFULE9BSHVDLENBR3RCOztBQUhzQixLQUF2QyxDQUFqQjtBQU1BLFVBQU1FLGNBQWMsR0FBRyxJQUFJTixPQUFPLENBQUNPLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUMsZ0JBQWpDLEVBQW1EO0FBQ3hFUixNQUFBQSxRQUR3RTtBQUV4RVMsTUFBQUEsY0FBYyxFQUFFLEtBRndEO0FBR3hFQyxNQUFBQSxTQUFTLEVBQUU7QUFBRUMsUUFBQUEsaUJBQWlCLEVBQUU7QUFBckI7QUFINkQsS0FBbkQsQ0FBdkI7QUFNQSxVQUFNQyxZQUFZLEdBQUcsSUFBSVgsT0FBTyxDQUFDWSxlQUFaLENBQTRCLElBQTVCLEVBQWtDLGNBQWxDLEVBQWtEO0FBQ3JFQyxNQUFBQSw4QkFBOEIsRUFBRSxLQURxQztBQUM5QjtBQUN2Q0MsTUFBQUEsd0JBQXdCLEVBQUUsQ0FDeEI7QUFDRUMsUUFBQUEsUUFBUSxFQUFFVCxjQUFjLENBQUNVLGdCQUQzQjtBQUVFQyxRQUFBQSxZQUFZLEVBQUVsQixRQUFRLENBQUNtQjtBQUZ6QixPQUR3QjtBQUYyQyxLQUFsRCxDQUFyQjtBQVVBLFVBQU1DLGlCQUFpQixHQUFHLElBQUlDLHdCQUFKLENBQW9CLElBQXBCLEVBQTBCLGlCQUExQixFQUE2QztBQUNyRVQsTUFBQUE7QUFEcUUsS0FBN0MsQ0FBMUI7QUFJQVEsSUFBQUEsaUJBQWlCLENBQUNFLElBQWxCLENBQXVCQyxXQUF2QixDQUNFLElBQUlDLEdBQUcsQ0FBQ0MsZUFBUixDQUF3QjtBQUN0QkMsTUFBQUEsT0FBTyxFQUFFLENBQUMsTUFBRCxDQURhO0FBRXRCQyxNQUFBQSxNQUFNLEVBQUVILEdBQUcsQ0FBQ0ksTUFBSixDQUFXQyxLQUZHO0FBR3RCQyxNQUFBQSxTQUFTLEVBQUUsQ0FDVGxDLFNBQVMsR0FBRyxrREFESDtBQUhXLEtBQXhCLENBREYsRUFqQzRCLENBMkM1Qjs7QUFDQSxRQUFJbUMsZUFBSixDQUFjLElBQWQsRUFBb0IsWUFBcEIsRUFBa0M7QUFDaENDLE1BQUFBLEtBQUssRUFBRWhDLFFBQVEsQ0FBQ2lDO0FBRGdCLEtBQWxDO0FBR0EsUUFBSUYsZUFBSixDQUFjLElBQWQsRUFBb0Isa0JBQXBCLEVBQXdDO0FBQ3RDQyxNQUFBQSxLQUFLLEVBQUV6QixjQUFjLENBQUNVO0FBRGdCLEtBQXhDO0FBR0EsUUFBSWMsZUFBSixDQUFjLElBQWQsRUFBb0IsZ0JBQXBCLEVBQXNDO0FBQ3BDQyxNQUFBQSxLQUFLLEVBQUVwQixZQUFZLENBQUNzQjtBQURnQixLQUF0QztBQUdBLFFBQUlILGVBQUosQ0FBYyxJQUFkLEVBQW9CLHVCQUFwQixFQUE2QztBQUMzQ0MsTUFBQUEsS0FBSyxFQUFFWixpQkFBaUIsQ0FBQ0UsSUFBbEIsQ0FBdUJhLFFBRGE7QUFFM0NDLE1BQUFBLFVBQVUsRUFBRXZDLEdBQUcsQ0FBQ3dDLG1CQUFKLENBQXdCLGlCQUF4QjtBQUYrQixLQUE3QztBQUlEOztBQTFEaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gXCJAYXdzLWNkay9hd3MtaWFtXCI7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gXCJAYXdzLWNkay9hd3MtY29nbml0b1wiO1xuaW1wb3J0ICogYXMgc3N0IGZyb20gXCJAc2VydmVybGVzcy1zdGFjay9yZXNvdXJjZXNcIjtcbmltcG9ydCBDb2duaXRvQXV0aFJvbGUgZnJvbSBcIi4vQ29nbml0b0F1dGhSb2xlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvZ25pdG9TdGFjayBleHRlbmRzIHNzdC5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlLCBpZCwgcHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHsgYnVja2V0QXJuIH0gPSBwcm9wcztcblxuICAgIGNvbnN0IGFwcCA9IHRoaXMubm9kZS5yb290O1xuXG4gICAgY29uc3QgdXNlclBvb2wgPSBuZXcgY29nbml0by5Vc2VyUG9vbCh0aGlzLCBcIlVzZXJQb29sXCIsIHtcbiAgICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxuICAgICAgYXV0b1ZlcmlmeTogeyBlbWFpbDogdHJ1ZSB9LFxuICAgICAgc2lnbkluQWxpYXNlczogeyBlbWFpbDogdHJ1ZSB9LCAvLyBTZXQgZW1haWwgYXMgYW4gYWxpYXNcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXJQb29sQ2xpZW50ID0gbmV3IGNvZ25pdG8uVXNlclBvb2xDbGllbnQodGhpcywgXCJVc2VyUG9vbENsaWVudFwiLCB7XG4gICAgICB1c2VyUG9vbCxcbiAgICAgIGdlbmVyYXRlU2VjcmV0OiBmYWxzZSxcbiAgICAgIGF1dGhGbG93czogeyBhZG1pblVzZXJQYXNzd29yZDogZmFsc2UgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGlkZW50aXR5UG9vbCA9IG5ldyBjb2duaXRvLkNmbklkZW50aXR5UG9vbCh0aGlzLCBcIklkZW50aXR5UG9vbFwiLCB7XG4gICAgICBhbGxvd1VuYXV0aGVudGljYXRlZElkZW50aXRpZXM6IGZhbHNlLCAvLyBEb24ndCBhbGxvdyB1bmF0aGVudGljYXRlZCB1c2Vyc1xuICAgICAgY29nbml0b0lkZW50aXR5UHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBjbGllbnRJZDogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICAgICAgICBwcm92aWRlck5hbWU6IHVzZXJQb29sLnVzZXJQb29sUHJvdmlkZXJOYW1lLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhlbnRpY2F0ZWRSb2xlID0gbmV3IENvZ25pdG9BdXRoUm9sZSh0aGlzLCBcIkNvZ25pdG9BdXRoUm9sZVwiLCB7XG4gICAgICBpZGVudGl0eVBvb2wsXG4gICAgfSk7XG5cbiAgICBhdXRoZW50aWNhdGVkUm9sZS5yb2xlLmFkZFRvUG9saWN5KFxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICBhY3Rpb25zOiBbXCJzMzoqXCJdLFxuICAgICAgICBlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1csXG4gICAgICAgIHJlc291cmNlczogW1xuICAgICAgICAgIGJ1Y2tldEFybiArIFwiL3ByaXZhdGUvJHtjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206c3VifS8qXCIsXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBFeHBvcnQgdmFsdWVzXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlVzZXJQb29sSWRcIiwge1xuICAgICAgdmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlVzZXJQb29sQ2xpZW50SWRcIiwge1xuICAgICAgdmFsdWU6IHVzZXJQb29sQ2xpZW50LnVzZXJQb29sQ2xpZW50SWQsXG4gICAgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIklkZW50aXR5UG9vbElkXCIsIHtcbiAgICAgIHZhbHVlOiBpZGVudGl0eVBvb2wucmVmLFxuICAgIH0pO1xuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJBdXRoZW50aWNhdGVkUm9sZU5hbWVcIiwge1xuICAgICAgdmFsdWU6IGF1dGhlbnRpY2F0ZWRSb2xlLnJvbGUucm9sZU5hbWUsXG4gICAgICBleHBvcnROYW1lOiBhcHAubG9naWNhbFByZWZpeGVkTmFtZShcIkNvZ25pdG9BdXRoUm9sZVwiKSxcbiAgICB9KTtcbiAgfVxufVxuIl19