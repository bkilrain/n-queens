/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var matrix = board.attributes;
  var solution = [];
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      } else {
        break;
      }
    }
    solution.push(matrix[row]);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// Time Complexity: linear

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for (var i = n; i > 0; i--) {
    solutionCount *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// Time Complexity: linear

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = {n: n};

  var getOptions = function(n) {
    opts = [];
    for (var i = 0; i < n; i++) {
      opts.push(parseInt(Math.pow(10, i)));
    }

    return opts;


    // var results = [];

    // for (var i = 0; i < n; i++) {
    //   var result = [];
    //   for (var j = 0; j < n; j++) {
    //     if (i === j) {
    //       result.push(1);
    //     } else {
    //       result.push(0);
    //     }
    //   }
    //   results.push(result);
    // }
    // return results;
  };
  var options = getOptions(n);


  var recurse = function(currentOptions, currentResults) {
    if (currentOptions.length === 0) {
      var solved = currentResults.map(function(item) {
        var row = item.toString(2).split('');
        return new Array(n - row.length + 1).join('0').split('').concat(row);
      });
      solution = solved.map(function(row) {
        return row.map(function(item) {
          return Number(item);
        });
      }); 
      return;
    } else {
      var nextOption = true;
      for (var i = 0; i < currentOptions.length; i++) {
        for (var j = 0; j < currentResults.length; j++) {
          var low = Math.min(currentOptions[i], currentResults[j]);
          var high = Math.max(currentOptions[i], currentResults[j]);
          if (Math.pow(low, 2 * (currentResults.length - j)) === high) {
            nextOption = false;
            break;
          } 
        } 
        if (nextOption) {
          var checkOption = currentOptions.splice(i, 1);
          recurse(currentOptions, currentResults.concat(checkOption));
          currentOptions.splice(i, 0, checkOption[0]);
        }
      }
    }










    // if (currentOptions.length === 0) {
    //   var check = new Board(currentResults);
    //   if (!check.hasAnyQueensConflicts()) {
    //     solution = currentResults.slice();
    //   }
    //   return;
    // } else {
    //   for (var i = 0; i < currentOptions.length; i++) {
    //     var checkOpDec = parseInt(currentOptions[i].join(''), 2);
    //     var lastOpDec = currentResults.length > 0 ? parseInt(currentResults[currentResults.length - 1].join(''), 2) : undefined;
    //     if (checkOpDec / 2 === lastOpDec || checkOpDec * 2 === lastOpDec) {
    //       continue;
    //     }
    //     var checkOption = currentOptions.splice(i, 1);
    //     recurse(currentOptions, currentResults.concat(checkOption));
    //     currentOptions.splice(i, 0, checkOption[0]);
    //   }
    // }
  };

  recurse(options, []);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

//Time Complexity: quadratic

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 

  var getOptions = function(n) {
    var results = [];

    for (var i = 0; i < n; i++) {
      var result = [];
      for (var j = 0; j < n; j++) {
        if (i === j) {
          result.push(1);
        } else {
          result.push(0);
        }
      }
      results.push(result);
    }
    return results;
  };
  var options = getOptions(n);


  var recurse = function(currentOptions, currentResults) {
    if (currentOptions.length === 0) {
      var check = new Board(currentResults);
      if (!check.hasAnyQueensConflicts()) {
        solutionCount++;
      }
      return;
    } else {
      for (var i = 0; i < currentOptions.length; i++) {
        var checkOpDec = parseInt(currentOptions[i].join(''), 2);
        var lastOpDec = currentResults.length > 0 ? parseInt(currentResults[currentResults.length - 1].join(''), 2) : undefined;
        if (checkOpDec / 2 === lastOpDec || checkOpDec * 2 === lastOpDec) {
          continue;
        }

        var checkOption = currentOptions.splice(i, 1);
        recurse(currentOptions, currentResults.concat(checkOption));
        currentOptions.splice(i, 0, checkOption[0]);
      }
    }
  };

  recurse(options, []);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

//Time Complexity: quadratic