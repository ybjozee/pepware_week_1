import React, { useCallback, useState } from 'react';
import Dropzone from './Components/Dropzone';
import DataTable from './Components/DataTable';
import { Button, Grid } from 'semantic-ui-react';

const App = () => {
  const [basicData, setBasicData] = useState([]);
  const [deluxData, setDeluxData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [uploadStage, setUploadStage] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [unitPrice, setUnitPrice] = useState(5);

  const headerTitleArray = ['Basic Cupcake', 'Deluxe Cupcake', 'Total', 'Weekly', 'Monthly', 'Annual'];

  const durationArray = [
    ['Today', 'Yesterday', 'days'],
    ['This week', 'Last week', 'weeks'],
    ['This month', 'Last month', 'months'],
    ['This year', 'Last year', 'years']
  ];

  const updateTableData = (inputArray) => {
    const tableData = inputArray.slice(1);
    switch (inputArray[0].toLowerCase()) {
      case 'basic cupcake':
        setBasicData(tableData.reverse());
        break;
      case 'delux cupcakes':
        setDeluxData(tableData.reverse());
        break;
      case 'total':
        setTotalData(tableData.reverse());
        break;
      default: break;
    }
  }

  const resetData = () => {
    setUploadStage(0);
    setBasicData([]);
    setDeluxData([]);
    setTotalData([]);
  }

  const onDrop = useCallback(acceptedFiles => {
    setUploadStage(1);
    Array.from(acceptedFiles).forEach(file => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const content = fileReader.result;
        updateTableData(content.replace(':', '').split('\n'));
      }
      fileReader.readAsText(file);
    })
  }, []);

  const getTableData = () => {
    switch (selectedButtonIndex) {
      case 0:
        return basicData;
      case 1:
        return deluxData;
      case 2:
        return totalData;
      case 3:
        return groupTotalSales(7);
      case 4:
        return groupTotalSales(30);
      case 5:
        return groupTotalSales(365);
      default:
        break;
    }
  }

  const groupTotalSales = (magicNumber) => {
    let totalSales = [];
    let numberOfItems = Math.ceil(totalData.length / magicNumber);
    for (let i = 0; i < numberOfItems; i++) {
      const startIndex = i * magicNumber;
      totalSales.push(
        totalData.slice(startIndex, startIndex + magicNumber).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue))
      );
    }
    return totalSales;
  }

  const getComponent = () => {
    switch (uploadStage) {
      case 0: return (
        <Dropzone onDrop={onDrop} accept={'.txt'} />
      );
      case 1: return (
        <Grid divided='vertically' centered>
          <Grid.Row columns={1}>
            <div className='text-center'>
              <h2>Upload Successful</h2>
            </div>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Button.Group>
              <Button negative onClick={() => {
                resetData();
              }}>Cancel</Button>
              <Button.Or />
              <Button positive onClick={() => {
                setUploadStage(2);
              }}>Finish</Button>
            </Button.Group>
          </Grid.Row>
        </Grid>
      );
      case 2: return (
        <Grid centered>
          <Grid.Row columns={1}>
            <Button.Group>
              <Button basic color='red' onClick={() => {
                setSelectedButtonIndex(0);
                setUnitPrice(5);
              }}>Basic Cupcakes</Button>
              <Button basic color='green' onClick={() => {
                setSelectedButtonIndex(1);
                setUnitPrice(6);
              }}>Deluxe Cupcakes</Button>
              <Button basic color='blue' onClick={() => {
                setSelectedButtonIndex(2);
                setUnitPrice(0);
              }}>Total Sales</Button>
              <Button basic color='blue' onClick={() => {
                setSelectedButtonIndex(3);
                setUnitPrice(0);
              }}>Weekly Sales</Button>
              <Button basic color='green' onClick={() => {
                setSelectedButtonIndex(4);
                setUnitPrice(0);
              }}>Monthly Sales</Button>
              <Button basic color='red' onClick={() => {
                setSelectedButtonIndex(5);
                setUnitPrice(0);
              }}>Annual Sales</Button>
            </Button.Group>
          </Grid.Row>
          <Grid.Row columns={1}>
            <h1>
              {`${headerTitleArray[selectedButtonIndex]} Sales`}
            </h1>
          </Grid.Row>
          <Grid.Row columns={1}>
            <DataTable tableData={getTableData()} unitValue={unitPrice} durationArray={selectedButtonIndex < 2 ? durationArray[0] : durationArray[selectedButtonIndex-2]} />
          </Grid.Row>
          <Grid.Row columns={1}>
            <Button
              content='Restart'
              negative
              onClick={() => { resetData() }}
            />
          </Grid.Row>
        </Grid>
      );
      default: break;
    }
  }

  return (
    <main className='App'>
      <h1 className='text-center'> Pepware Week 1 Challenge </h1>
      {getComponent()}
    </main>
  );
}

export default App;
