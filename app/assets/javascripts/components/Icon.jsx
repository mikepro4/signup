define([

  'react'


], function (

  React

) { 
  
  var Icon = React.createClass({

    render: function() {
      switch(this.props.type) {

        case 'cs_logo': 
          return (
            <svg viewBox="0 0 123 27">
            <path d="M33,13.4L33,13.4c0-3,2.3-5.5,5.4-5.5c1.9,0,3.1,0.7,4.2,1.7l-0.8,0.9C40.9,9.6,39.9,9,38.5,9
                c-2.4,0-4.2,1.9-4.2,4.4v0c0,2.5,1.8,4.4,4.2,4.4c1.5,0,2.4-0.6,3.5-1.5l0.8,0.8c-1.1,1.1-2.3,1.9-4.3,1.9
                C35.3,18.9,33,16.5,33,13.4z M44.9,13.4L44.9,13.4c0-3,2.2-5.5,5.5-5.5c3.3,0,5.5,2.5,5.5,5.5v0c0,2.9-2.2,5.5-5.5,5.5
                C47.1,18.9,44.9,16.4,44.9,13.4z M54.6,13.4L54.6,13.4c0-2.4-1.8-4.4-4.2-4.4c-2.5,0-4.2,1.9-4.2,4.4v0c0,2.4,1.8,4.4,4.2,4.4
                C52.9,17.8,54.6,15.9,54.6,13.4z M58.8,8.1H60l3.9,5.8l3.9-5.8H69v10.6h-1.2v-8.6l-3.9,5.7h-0.1L60,10.1v8.6h-1.2V8.1z M72.9,8.1h4
                c2.4,0,4,1.3,4,3.4v0c0,2.3-1.9,3.5-4.2,3.5h-2.6v3.8h-1.2V8.1z M76.7,13.9c1.8,0,2.9-0.9,2.9-2.3v0c0-1.5-1.2-2.3-2.9-2.3h-2.7v4.7
                H76.7z M82.6,17.2l0.8-0.9c1.1,1,2.2,1.5,3.7,1.5c1.4,0,2.4-0.8,2.4-1.8v0c0-1-0.5-1.5-2.8-2c-2.5-0.5-3.6-1.3-3.6-3.1v0
                c0-1.7,1.5-2.9,3.5-2.9c1.6,0,2.7,0.4,3.8,1.3l-0.7,0.9c-1-0.8-2-1.2-3.1-1.2c-1.4,0-2.3,0.8-2.3,1.7v0c0,1,0.6,1.6,2.9,2.1
                c2.4,0.5,3.5,1.4,3.5,3v0c0,1.8-1.5,3-3.7,3C85.3,18.9,83.9,18.3,82.6,17.2z M95.9,9.2h-3.6V8.1h8.4v1.1h-3.6v9.5h-1.2V9.2z
                 M105.6,8h1.1l4.9,10.7h-1.3l-1.3-2.8h-5.8l-1.3,2.8h-1.2L105.6,8z M108.6,14.8l-2.4-5.4l-2.5,5.4H108.6z M113.9,8.1h1.2v6.4
                l6.2-6.4h1.6l-4.6,4.6l4.8,6h-1.5l-4.1-5.2l-2.3,2.3v2.9h-1.2V8.1z M12,0L0,6.8v13.5L12,27l12-6.8v-2.8l-12,6.8l-9.5-5.4V8.1L12,2.8
                l9.5,5.4L12,13.5v2.8l12-6.7V6.8L12,0z M12,21.6l12-6.7v-2.8l-12,6.7V21.6z"/>
            </svg>
        );

        case 'circle_dollar':
          return (
            <svg viewBox="0 0 40 40">
            <path fill="#50B67F" d="M20.1,0c11.1,0,20.1,9,20.1,20.1s-9,20.1-20.1,20.1S0,31.2,0,20.1S9,0,20.1,0z M24.5,14.8
              c-1-0.8-2.1-1.2-3.5-1.4v-1.1h-1.6v1.1c-2.3,0.2-3.9,1.5-3.9,3.5v0c0,2.1,1.3,3.1,4,3.8v3.6c-1.2-0.2-2.2-0.8-3.3-1.6L15,24.3
              c1.2,1,2.8,1.6,4.4,1.8V28H21v-1.8c2.3-0.2,3.9-1.6,3.9-3.6v0c0-2-1.2-3.1-4-3.8v-3.5c0.9,0.2,1.7,0.6,2.5,1.2L24.5,14.8z
               M17.7,16.7L17.7,16.7c0-0.8,0.6-1.4,1.8-1.5v3.2C18,18,17.7,17.5,17.7,16.7z M22.8,22.7L22.8,22.7c0,0.9-0.6,1.5-1.8,1.6V21
              C22.4,21.4,22.8,21.9,22.8,22.7z"/>
            </svg>
          );

        case 'circle_user': 
          return (
            <svg viewBox="0 0 40 40">
            <path fill="#50B67F" d="M20.1,0c11.1,0,20.1,9,20.1,20.1s-9,20.1-20.1,20.1S0,31.2,0,20.1S9,0,20.1,0z M16.4,16.8
              c0,2,1.7,3.7,3.7,3.7s3.7-1.7,3.7-3.7s-1.7-3.7-3.7-3.7S16.4,14.8,16.4,16.8z M27.1,27.1c-0.8-3.1-3.6-5.5-7-5.5s-6.2,2.3-7,5.5
              H27.1z"/>
            </svg>
          )

        case 'circle_asterisk': 
          return (
            <svg viewBox="0 0 40 40">
            <path fill="#50B67F" d="M20.1,0c11.1,0,20.1,9,20.1,20.1s-9,20.1-20.1,20.1S0,31.2,0,20.1S9,0,20.1,0z M18.7,27.4h2.5l-0.5-6l5,3.5
              l1.3-2.3l-5.6-2.5l5.6-2.6l-1.3-2.2l-5,3.5l0.5-6h-2.5l0.5,6l-5-3.5l-1.3,2.2l5.6,2.6l-5.6,2.5l1.3,2.3l5-3.5L18.7,27.4z"/>
            </svg>
          )

        case 'circle_error': 
          return (
            <svg viewBox="0 0 20 20">
            <path d="M10,0.982c4.973,0,9.018,4.046,9.018,9.018S14.973,19.018,10,19.018S0.982,14.973,0.982,10
              S5.027,0.982,10,0.982 M10,0C4.477,0,0,4.477,0,10c0,5.523,4.477,10,10,10s10-4.477,10-10C20,4.477,15.523,0,10,0L10,0z M9,5.703
              V5.441h2.5v0.262l-0.66,5.779H9.66L9,5.703z M9.44,12.951h1.621v1.491H9.44V12.951z"/>
            </svg>
          )

        case 'circle_tick': 
          return (
            <svg viewBox="0 0 23 23">
            <path d="M11.5,23C5.2,23,0,17.8,0,11.5S5.2,0,11.5,0S23,5.2,23,11.5S17.8,23,11.5,23z M11.5,1C5.7,1,1,5.7,1,11.5S5.7,22,11.5,22
              S22,17.3,22,11.5S17.3,1,11.5,1z M10.4,15.2l6.7-7c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L10,14.2L7,11
              c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7l3.4,3.5c0.1,0.1,0.2,0.1,0.3,0.1S10.3,15.3,10.4,15.2z"/>
            </svg>
          )

        case 'circle_tick_filled':
          return (
            <svg viewBox="0 0 20 20">
              <path fill="#4FB07F" d="M9.5,0C14.7,0,19,4.3,19,9.5S14.7,19,9.5,19S0,14.7,0,9.5S4.3,0,9.5,0z"/>
              <path fill="#FFFFFF" d="M8.7,12.9c-0.1,0-0.2,0-0.3-0.1l-2.4-2.5c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0L8.7,12l4.6-5
                c0.1-0.1,0.4-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5L9,12.8C9,12.8,8.9,12.9,8.7,12.9C8.8,12.9,8.8,12.9,8.7,12.9z"/>
            </svg>
          )

        case 'success_tick': 
          return (
            <svg viewBox="0 0 57 57">
              <path fill="#4FB37F" d="M56.8,28.4c0,15.7-12.7,28.4-28.4,28.4S0,44.1,0,28.4S12.7,0,28.4,0S56.8,12.7,56.8,28.4z M25.9,38.3
                c0.3,0,0.7-0.1,0.8-0.3l14.9-15.6c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.1-0.4-1.6,0L25.9,35.7l-6.7-6.6c-0.4-0.4-1.1-0.4-1.6,0
                c-0.4,0.4-0.4,1.1,0,1.6l7.5,7.4C25.4,38.2,25.6,38.3,25.9,38.3C26,38.3,26,38.3,25.9,38.3z"/>
            </svg>
          )
      } 
    }
  });

  return Icon;
});