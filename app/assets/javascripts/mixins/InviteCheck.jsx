define([], function () {

  InviteCheckMixin = {
    componentDidMount: function () {
      if(!this.props.inviteValues) {
        // this.transitionTo('signup');
      }
    }
  }

  return InviteCheckMixin;

})