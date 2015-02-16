define([

    'react', 'underscore',

], function (

    React, _

) { 

  var cx = React.addons.classSet;

  var Dropdown = React.createClass({

    displayName: 'Dropdown',

    getInitialState: function() {
      return {
        selected: undefined,
        isOpen: false
      }
    },

    componentWillMount: function() {
      this.setState({
        selected: this.props.value || { label: 'Select...', value: '' }
      })
    },

    componentDidMount: function () {
      this.setCorrectState(this.props.value);
    },


    componentWillReceiveProps: function(newProps) {
      if (newProps.value && newProps.value !== this.state.selected) {
        this.setCorrectState(newProps.value);
      }
    },

    handleMouseDown: function(event) {

      if (event.type == 'mousedown' && event.button !== 0) return
      event.stopPropagation()
      event.preventDefault()

      this.setState({
        isOpen: !this.state.isOpen
      })
    },

    setValue: function(option) {
      var newState = {
        selected: option,
        isOpen: false
      }
      this.fireChangeEvent(newState)
      this.setState(newState)
    },

    fireChangeEvent: function(newState) {
      if (newState.selected !== this.state.selected &&this.props.onChange) {
        this.props.onChange(newState.selected);
      }
    },

    renderOption: function (option) {
      var optionClass = cx({
        'Dropdown-option': true,
        'is-selected': option == this.state.selected
      })

      return <div key={option.value} className={optionClass} onMouseDown={this.setValue.bind(this, option)} onClick={this.setValue.bind(this, option)}>{option.label}</div>
    },

    buildMenu: function() {
      var ops = this.props.options.map(function(option) {

        if (option.type == 'group') {
          var groupTitle = (<div className='title'>{option.name}</div>)
          var _options = option.items.map(function(item) {
            return this.renderOption(item)
          }.bind(this))
          return (
            <div className='group' key={option.name}>
              {groupTitle}
              {_options}
            </div>
          )
        } else {
          return this.renderOption(option)
        }

      }.bind(this))

      return ops.length ? ops : <div className='Dropdown-noresults'>No opitons found</div>
    },

    findOption: function (value) {
      var option = this.props.options.filter(function(object) {
        return object.value == value
      })
    },

    setCorrectState: function (value) {
      if(_.isUndefined(value)) {
        this.setState({
          selected: { label: 'Select...', value: '' }
        })
      } else {
        if(_.isString(value)) {
          
          var option = this.props.options.filter(function(object) {
            return object.value == value
          })

          if(_.isEmpty(option)) {
            this.setState({
              selected: { label: 'Select...', value: '' }
            })
          } else {
            this.setState({
              selected: { label: option[0].label, value: option[0].value }
            })
          }
        }   
      }
    },

    render: function() {
      var value = '';
      var selectedLabel = this.state.selected.label;
      var menu = this.state.isOpen ? <div className='Dropdown-menu'>{this.buildMenu()}</div> : null

      var dropdownClass = cx({
        'Dropdown': true,
        'is-open': this.state.isOpen
      })

      return (
        <div className={dropdownClass}>
          <div className='Dropdown-control' onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
            <div className='placeholder'>{selectedLabel}</div>
            <span className='Dropdown-arrow' />
          </div>
          {menu}
        </div>
      )
    }

  })

  return Dropdown;



});