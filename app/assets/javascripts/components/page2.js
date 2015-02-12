define([

  'react', 

], function (

  React

) {
  return React.createClass({
    
    render: function () {
      return (
          <div className="page">
            <h1>Page 2 (required)</h1>
            <p>Different content.</p>
          </div>
        );
    }
  });
});