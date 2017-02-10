var exec = require('child_process').exec;
var through = require('through');
var os = require('os');
var child;

var args = process.argv;

function openTab(cmd, options, cb) {
  if (os.platform() !== 'darwin') {
    throw new Error('No support for this operating system but feel free to fork the repo and add it :)');
  }
  
  console.log(options)
  
  var open = ['osascript -e \'tell application "Terminal" to activate\' ',
           '-e \'tell application "System Events" to tell process "Terminal" to keystroke "t"',
           'using command down\' ',
           '-e \'tell application "Terminal" to do script',
           '"', cmd, '"',
           'in selected tab of the front window\''].join('');

  child = exec(open, options, function(error, stdout, stderr) {
    if (error) {

    }

    if (cb && typeof cb === 'function') {
      cb.call(null, arguments);
    }

  });

  child.on('exit', function(code) {

  });
}

process.stdin.setEncoding('utf8');

process.stdin.pipe(through(function(buf) {
  openTab(buf.toString());
  process.exit(0);
}, function() {
}));

if (args.length > 3) {
  openTab(args.slice(2).join(' '));
  process.exit(0);
}

module.exports = {
  open: openTab
};
