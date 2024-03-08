module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "disallow the use of semicolons",
        category: "Stylistic Issues",
        recommended: false,
      },
      fixable: "code",
      schema: [], 
    },
    create: function(context) {
      return {

        ExpressionStatement(node) {
          if (node.parent && node.parent.type !== 'ForStatement' && sourceCode.getLastToken(node).value === ';') {
            context.report({
              node,
              message: "Unexpected semicolon.",
              fix(fixer) {
                const lastToken = context.getSourceCode().getLastToken(node);
                if (lastToken.value === ";") {
                  return fixer.remove(lastToken);
                }
              }
            });
          }
        }
      };
    }
  };
  
  