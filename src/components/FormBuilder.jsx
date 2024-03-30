import { Fragment, useState } from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
//Material UI Components
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
//Icons
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//Form Elements
import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput,
  DateInput,
  TimeInput,
} from "../../src/components/elements/index.jsx";
import { formEl } from "./Constants.js";
//Components
import Header from "./Header.jsx";

const FormBuilder = () => {
  const initVal = formEl[0]?.value;

  //State
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState("text");

  const items = data;

  //Function to add new element
  const addElement = () => {
    const data = {
      id: uuid(),
      value: null,
      type: formData,
      required: false,
    };
    setData((prevState) => [...prevState, data]);
    setFormData(initVal);
  };

  //Function to delete element
  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  //Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index+1), newEl, ...elArray.slice(index+1)];
  };

  //Function to duplicate element
  const duplicateElement = (elId, elType) => {
    let elIdx = data.findIndex( (el) =>el.id === elId);
    let newEl = {
      id: uuid(),
      value: null,
      type: elType,
      required: false,
    }
    let newArr = addAfter(data,elIdx,newEl)
    setData(newArr)
  };

  //Function to handle sorting of elements
  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  //Function to Handle Input Values
  const handleValue = (id, e) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Required
  const handleRequired = (id) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Element Type
  const handleElType = (id, type) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Options
  const addOption = (id, newOption) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        const objVal = "options" in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Date
  const handleDate = (id, dateVal) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, date: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Time
  const handleTime = (id, dateVal) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, time: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Change Option Values
const handleOptionValues = (elId, optionId, optionVal) => {
  let newArr = data.map((el) => {
    if (el.id === elId) {
      el.options = el.options.map((opt) => {
        if (opt.id === optionId) {
          return { ...opt, value: optionVal }; // Ensure a return value here
        }
        return opt; // Ensure a return value for all cases
      });
    }
    return el; // Ensure a return value for all cases
  });
  setData(newArr);
};

//Function to Delete Option
const deleteOption = (elId, optionId) => {
  let newArr = data.map((el) => {
    if (el.id === elId) {
      let newOptions = el.options.filter((opt) => opt.id !== optionId);
      return { ...el, options: newOptions }; // Ensure a return value here
    }
    return el; // Ensure a return value for all cases
  });
  setData(newArr);
};


  //Render items
  const renderElements = ({ item }) => {
    switch (item.type) {
      case "text":
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "radio":
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case "date":
        return (
          <DateInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleDate={handleDate}
            duplicateElement={duplicateElement}
          />
        );
      case "time":
        return (
          <TimeInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleTime={handleTime}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  console.log(data);

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={6}>
          <Header
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          <Nestable
            items={items}
            renderItem={renderElements}
            maxDepth={1}
            onChange={handleOnChangeSort}
          />
        </Grid>
        <Grid item md={1}>
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              sx={{ position: "sticky", top: 30 }}
            >
              <AddCircleOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default FormBuilder;
