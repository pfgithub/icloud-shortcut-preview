"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ActionIcon = _interopRequireDefault(require("../ActionIcon"));

var _Field = _interopRequireDefault(require("./Field"));

var _Select = _interopRequireDefault(require("./Select"));

var _AppField = _interopRequireDefault(require("./AppField"));

var _Token = _interopRequireDefault(require("./Token"));

var _utils = require("../utils");

var _stylesModule = _interopRequireDefault(require("./styles.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var variableIndex = 0;
var previousOutputUUID = '';
var magicVariables = {};

var ActionBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ActionBlock, _React$Component);

  function ActionBlock(props) {
    var _this;

    _classCallCheck(this, ActionBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActionBlock).call(this, props)); // TODO: handle Filter Files (and all the ".filter" actions) parameters
    // if (data.Name === 'Filter Files') console.log(value);

    _defineProperty(_assertThisInitialized(_this), "getVariable", function (attachment) {
      var aggrandizement = attachment.Aggrandizements && attachment.Aggrandizements.map(function (aggr) {
        switch (aggr.Type) {
          case 'WFDictionaryValueVariableAggrandizement':
            return aggr.DictionaryKey;

          case 'WFPropertyVariableAggrandizement':
            return aggr.PropertyName;

          default:
            return;
        }
      }).filter(Boolean)[0];

      switch (attachment.Type) {
        case 'ActionOutput':
          var variable = magicVariables[attachment.OutputUUID];
          return variable ? _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              name: variable.name,
              icon: variable.icon,
              aggrandizement: aggrandizement
            }
          }) : null;

        case 'Variable':
          return _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              name: attachment.VariableName,
              aggrandizement: aggrandizement
            }
          });

        case 'Clipboard':
          return _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              global: true,
              name: 'Clipboard',
              icon: 'Clipboard',
              aggrandizement: aggrandizement
            }
          });

        case 'CurrentDate':
          return _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              global: true,
              name: 'Current Date',
              icon: 'Date',
              aggrandizement: aggrandizement
            }
          });

        case 'Ask':
          return _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              global: true,
              name: 'Ask When Run',
              aggrandizement: aggrandizement
            }
          });

        case 'Input':
          return _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              global: true,
              name: 'Input',
              aggrandizement: aggrandizement
            }
          });

        case 'ExtensionInput':
          return _react.default.createElement(_Token.default, {
            key: "variable-".concat(variableIndex++),
            data: {
              global: true,
              name: 'Extension Input',
              icon: 'ShortcutExtension',
              aggrandizement: aggrandizement
            }
          });

        default:
          console.error("[ERROR: Variable] Unknown Type \"".concat(attachment.Type, "\""));
          return null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getParameterInput", function (Param, value) {
      var _classList, _classList3;

      if (value && value.WFSerializationType) {
        switch (value.WFSerializationType) {
          case 'WFTextTokenAttachment':
          case 'WFTextTokenString':
            break;

          default:
            console.error("[ERROR: Parameter] Unknown Value.WFSerializationType \"".concat(value.WFSerializationType, "\""));
        }
      } // "Create Folder", "Get/Save File" actions, "File/Destination Path" parameters
      // - add '/Shortcuts/' starting folder before the file path


      if (['WFFilePath', 'WFGetFilePath', 'WFFileDestinationPath'].includes(Param.Key)) {
        return _react.default.createElement(_Field.default, {
          data: Param,
          value: [_react.default.createElement("span", {
            key: "getFileInitialPath",
            className: _stylesModule.default.getFileInitialPath
          }, "/Shortcuts/"), (value || {}).WFSerializationType ? _this.parseWFValue(value) : value]
        });
      }

      switch (Param.Class) {
        case 'WFEnumerationParameter':
          if (value.WFSerializationType) value = _this.parseWFValue(value);
          return _react.default.createElement(_Select.default, {
            values: Param.Items,
            value: value
          });

        case 'WFSwitchParameter':
          return _react.default.createElement("span", {
            className: (0, _utils.classList)((_classList = {}, _defineProperty(_classList, _stylesModule.default.switch, true), _defineProperty(_classList, _stylesModule.default.checked, value), _classList))
          }, _react.default.createElement("small", null));

        case 'WFTextInputParameter':
        case 'WFNumberFieldParameter':
          return _react.default.createElement(_Field.default, {
            data: Param,
            value: (value || {}).WFSerializationType ? _this.parseWFValue(value) : value,
            className: (0, _utils.classList)(_defineProperty({}, _stylesModule.default.expanded, _this.props.metadata.expanded))
          });

        case 'WFVariablePickerParameter':
        case 'WFWorkflowPickerParameter':
        case 'WFArchiveFormatParameter':
        case 'WFDateFieldParameter':
          return _react.default.createElement(_Field.default, {
            data: _objectSpread({}, Param, {
              TextAlignment: 'Right'
            }),
            value: (value || {}).WFSerializationType ? _this.parseWFValue(value) : value
          });

        case 'WFAppPickerParameter':
          var apps = new Map([['is.workflow.my.app', 'Shortcuts']]);
          return _react.default.createElement(_Field.default, {
            data: _objectSpread({}, Param, {
              TextAlignment: 'Right'
            }),
            value: apps.get(value) || value
          });

        case 'WFVariableFieldParameter':
          return _react.default.createElement(_Field.default, {
            data: Param,
            value: value,
            className: _stylesModule.default.variable
          });

        case 'WFStorageServicePickerParameter':
          return _react.default.createElement(_AppField.default, {
            value: value
          });

        case 'WFExpandingParameter':
          return _react.default.createElement("svg", {
            viewBox: "0 0 448 512",
            className: (0, _utils.classList)((_classList3 = {}, _defineProperty(_classList3, _stylesModule.default.chevron, true), _defineProperty(_classList3, _stylesModule.default.expanded, value), _classList3))
          }, _react.default.createElement("path", {
            d: " M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z"
          }));

        default:
          console.error("[ERROR: Parameter] Unknown Class \"".concat(Param.Class, "\""));
          return _react.default.createElement(_Field.default, {
            data: Param,
            value: "This field hasn't yet been implemented",
            className: _stylesModule.default.notImplemented
          });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "parseWFValue", function (_ref) {
      var Value = _ref.Value,
          WFSerializationType = _ref.WFSerializationType;
      var RC = "\uFFFC"; // replacement character

      switch (WFSerializationType) {
        case 'WFTextTokenString':
          var text = Value.string;
          var tokens = [];
          Object.entries(Value.attachmentsByRange).forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                position = _ref3[0],
                value = _ref3[1];

            var index = Number(position.match(/\d+/)[0]);
            var attachment = value;

            switch (attachment.Type) {
              case 'ActionOutput':
              case 'Ask':
              case 'Clipboard':
              case 'CurrentDate':
              case 'ExtensionInput':
              case 'Input':
              case 'Variable':
                tokens[index] = _this.getVariable(attachment);
                break;

              default:
                console.error("[ERROR: Attachment] Unknown Type \"".concat(attachment.Type, "\""));
            }
          });
          tokens = tokens.filter(Boolean);
          return text.split(RC).reduce(function (previous, current) {
            previous = Array.isArray(previous) ? previous : [previous];
            return [].concat(_toConsumableArray(previous), [tokens.shift(), current]);
          });

        case 'WFTextTokenAttachment':
          return _this.getVariable(Value);

        case 'WFArrayParameterState':
          var arrayLength = Value.length;
          return arrayLength === 1 ? '1 item' : "".concat(arrayLength, " items");

        case 'WFDictionaryFieldValue':
          var dictLength = Value.Value.WFDictionaryFieldValueItems.length;
          return dictLength === 1 ? '1 item' : "".concat(dictLength, " items");

        case 'WFNumberSubstitutableState':
          return Value.WFSerializationType ? _this.parseWFValue(Value) : "".concat(Boolean(Value));

        default:
          console.error("[ERROR: Parameter] Unknown Value.WFSerializationType \"".concat(WFSerializationType, "\""));
      }
    });

    return _this;
  }

  _createClass(ActionBlock, [{
    key: "render",
    value: function render() {
      var _classList4,
          _classList5,
          _classList8,
          _classList9,
          _this2 = this;

      var _this$props = this.props,
          value = _this$props.value || {},
          data = _this$props.data,
          icon = _this$props.icon,
          missing = _this$props.missing,
          indentation = _this$props.indentation,
          metadata = _this$props.metadata;
      var UUID = value.UUID,
          CustomOutputName = value.CustomOutputName;

      if (UUID) {
        var OutputName = data.Output && data.Output.OutputName; // Missing OutputNames

        if (data.Name === 'If') OutputName = 'If Result';
        if (data.Name === 'Choose from Menu') OutputName = 'Menu Result';
        if (data.Name === 'Filter Files') OutputName = 'Files';
        if (data.Name === 'Get Details of Images') OutputName = 'Details of Images';
        if (data.Name === 'Find Music') OutputName = 'Music';
        if (data.Name === 'Find Reminders') OutputName = 'Reminders';
        if (data.Name === 'Find Photos') OutputName = 'Photos';
        if (data.Name === 'Find Contacts') OutputName = 'Contacts';
        magicVariables[UUID] = {
          name: CustomOutputName || OutputName || console.error("[ERROR: OutputName] Unknown OutputName for \"".concat(data.Name, "\" action")) || 'UNKNOWN',
          icon: icon || 'Placeholder'
        };
        previousOutputUUID = UUID;
      }

      var parameters = data && data.Parameters && data.Parameters.reduce(function (result, _ref4) {
        var Key = _ref4.Key,
            DefaultValue = _ref4.DefaultValue;
        var currentValue = value[Key];
        result[Key] = currentValue !== undefined ? currentValue : DefaultValue !== undefined ? DefaultValue : '';
        return result;
      }, {}) || {};
      var hasInput = data && data.Input || // TODO: check over the parameters directly
      JSON.stringify(parameters).includes("\"OutputUUID\":\"".concat(previousOutputUUID, "\""));
      if (missing) return _react.default.createElement("div", {
        className: (0, _utils.classList)((_classList4 = {}, _defineProperty(_classList4, _stylesModule.default.actionBlockWrapper, true), _defineProperty(_classList4, _stylesModule.default.input, hasInput), _classList4)),
        style: {
          '--indent': indentation
        }
      }, _react.default.createElement("div", {
        className: (0, _utils.classList)((_classList5 = {}, _defineProperty(_classList5, _stylesModule.default.actionBlock, true), _defineProperty(_classList5, _stylesModule.default.missing, true), _defineProperty(_classList5, _stylesModule.default.safari, metadata.safari), _classList5))
      }, _react.default.createElement("div", {
        className: _stylesModule.default.header
      }, _react.default.createElement(_ActionIcon.default, {
        name: icon,
        className: _stylesModule.default.icon
      }), _react.default.createElement("span", {
        className: _stylesModule.default.title
      }, "[", missing, "]")), _react.default.createElement("div", {
        className: _stylesModule.default.item
      }, _react.default.createElement("label", null, "Unkown action identifier"), _react.default.createElement(_Field.default, {
        data: {
          Placeholder: missing
        },
        value: missing
      }))));

      if (value.GroupingIdentifier && value.WFControlFlowMode) {
        var _classList6, _classList7;

        var _name;

        switch (value.WFControlFlowMode) {
          case 1:
            _name = data.Name === 'Choose from Menu' ? value.WFMenuItemTitle || '' : 'Otherwise';
            break;

          case 2:
            _name = "End ".concat(data.Name === 'Choose from Menu' ? 'Menu' : ['Repeat', 'Repeat with Each'].includes(data.Name) ? 'Repeat' : data.Name);
            break;
        }

        return _react.default.createElement("div", {
          className: (0, _utils.classList)((_classList6 = {}, _defineProperty(_classList6, _stylesModule.default.actionBlockWrapper, true), _defineProperty(_classList6, _stylesModule.default.input, hasInput), _classList6)),
          style: {
            '--indent': indentation
          }
        }, _react.default.createElement("div", {
          className: (0, _utils.classList)((_classList7 = {}, _defineProperty(_classList7, _stylesModule.default.actionBlock, true), _defineProperty(_classList7, _stylesModule.default.noIcon, true), _defineProperty(_classList7, _stylesModule.default.safari, metadata.safari), _classList7))
        }, _react.default.createElement("div", {
          className: _stylesModule.default.header
        }, _react.default.createElement("span", {
          className: _stylesModule.default.title
        }, _name || data.Name))));
      }

      return _react.default.createElement("div", {
        className: (0, _utils.classList)((_classList8 = {}, _defineProperty(_classList8, _stylesModule.default.actionBlockWrapper, true), _defineProperty(_classList8, _stylesModule.default.input, hasInput), _classList8)),
        style: {
          '--indent': indentation
        }
      }, _react.default.createElement("div", {
        className: (0, _utils.classList)((_classList9 = {}, _defineProperty(_classList9, _stylesModule.default.actionBlock, true), _defineProperty(_classList9, _stylesModule.default.comment, data.Name === 'Comment'), _defineProperty(_classList9, _stylesModule.default.safari, metadata.safari), _classList9))
      }, _react.default.createElement("div", {
        className: _stylesModule.default.header
      }, _react.default.createElement(_ActionIcon.default, {
        name: icon,
        className: _stylesModule.default.icon
      }), _react.default.createElement("span", {
        className: _stylesModule.default.title
      }, name || data.Name), metadata.debug && _react.default.createElement("span", {
        className: _stylesModule.default.log,
        onClick: function onClick() {
          return console.log({
            action: name || data.Name,
            parameters: parameters,
            value: value
          });
        }
      }, "LOG")), data.Parameters && data.Parameters.map(function (Param, i) {
        var _classList11;

        if (Param.Hidden) return null;
        if (Param.RequiredResources && Param.RequiredResources.map(function (_ref5) {
          var WFResourceClass = _ref5.WFResourceClass,
              WFParameterKey = _ref5.WFParameterKey,
              _ref5$WFParameterRela = _ref5.WFParameterRelation,
              WFParameterRelation = _ref5$WFParameterRela === void 0 ? '==' : _ref5$WFParameterRela,
              WFParameterValue = _ref5.WFParameterValue,
              WFParameterValues = _ref5.WFParameterValues,
              WFWorkflowType = _ref5.WFWorkflowType;

          switch (WFResourceClass) {
            case 'WFParameterRelationResource':
              var relation;

              switch (WFParameterRelation) {
                case '==':
                  relation = function relation(parameterValue) {
                    return parameters[WFParameterKey] === parameterValue;
                  };

                  break;

                case '!=':
                  relation = function relation(parameterValue) {
                    return parameters[WFParameterKey] !== parameterValue;
                  };

                  break;

                default:
                  console.error("[ERROR: Parameter] Unknown RequiredResources.WFParameterRelation \"".concat(WFParameterRelation, "\""));
                  return null;
              }

              if (WFParameterValues) {
                return WFParameterValues.map(relation)[WFParameterRelation === '==' ? 'some' : 'every'](Boolean);
              }

              return relation(WFParameterValue);

            case 'WFWorkflowTypeResource':
              switch (WFWorkflowType) {
                case 'WatchKit':
                  return false;

                default:
                  console.error("[ERROR: Parameter] Unknown RequiredResources.WFWorkflowType \"".concat(WFWorkflowType, "\""));
                  return null;
              }

            case 'WFDeviceAttributesResource':
              return true;

            default:
              console.error("[ERROR: Parameter] Unknown RequiredResources.WFResourceClass \"".concat(WFResourceClass, "\""));
              return null;
          }
        }).includes(false)) return null; // "Get File" action doesn't have "Initial Path" parameter anymore

        if (data.Name === 'Get File') {
          if (Param.Key === 'WFGetFileInitialDirectoryPath') return null;
        }

        switch (Param.Class) {
          case 'WFContentArrayParameter':
          case 'WFArrayParameter':
            return parameters[Param.Key].map(function (WFItem, i) {
              var value = typeof WFItem === 'string' ? WFItem : _this2.parseWFValue(WFItem.WFValue);
              return _react.default.createElement("div", {
                className: _stylesModule.default.item,
                key: i
              }, _react.default.createElement(_Field.default, {
                data: {
                  Placeholder: 'Text'
                },
                value: value
              }));
            });

          case 'WFDictionaryParameter':
            return parameters[Param.Key].Value && parameters[Param.Key].Value.WFDictionaryFieldValueItems.map(function (WFItem, i) {
              var _classList10;

              var key = typeof WFItem.WFKey === 'string' ? WFItem.WFKey : _this2.parseWFValue(WFItem.WFKey);
              var value = typeof WFItem.WFValue === 'string' ? WFItem.WFValue : _this2.parseWFValue(WFItem.WFValue);
              return _react.default.createElement("div", {
                className: (0, _utils.classList)((_classList10 = {}, _defineProperty(_classList10, _stylesModule.default.item, true), _defineProperty(_classList10, _stylesModule.default.dictionary, true), _classList10)),
                key: i
              }, _react.default.createElement(_Field.default, {
                data: {
                  Placeholder: 'Key'
                },
                value: key
              }), _react.default.createElement(_Field.default, {
                data: {
                  Placeholder: 'Text'
                },
                value: value
              }));
            });

          case 'WFStepperParameter':
            var StepperDescription = Param.StepperDescription,
                StepperPrefix = Param.StepperPrefix,
                StepperNoun = Param.StepperNoun,
                StepperPluralNoun = Param.StepperPluralNoun;
            var count = parameters[Param.Key];
            return _react.default.createElement("div", {
              className: (0, _utils.classList)((_classList11 = {}, _defineProperty(_classList11, _stylesModule.default.item, true), _defineProperty(_classList11, _stylesModule.default.stepper, true), _classList11)),
              key: i
            }, count && count.WFSerializationType ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("label", null, StepperDescription), _react.default.createElement(_Field.default, {
              data: {
                TextAlignment: 'Right'
              },
              value: _this2.parseWFValue(count)
            })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("label", null, StepperPrefix, " ".concat(count, " ").concat(count === 1 ? StepperNoun : StepperPluralNoun)), _react.default.createElement(_Select.default, {
              values: ['-', '+'],
              value: ""
            })));

          default:
            return _react.default.createElement("div", {
              className: _stylesModule.default.item,
              key: i
            }, Param.Label && !Param.Multiline && Param.Class !== 'WFContentArrayParameter' && _react.default.createElement("label", null, Param.Label), _this2.getParameterInput(Param, parameters[Param.Key]));
        }
      })));
    }
  }]);

  return ActionBlock;
}(_react.default.Component);

exports.default = ActionBlock;
