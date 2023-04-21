"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns


def graph():
    # this changes the default date converter for better interactive plotting of dates:
    plt.rcParams['date.converter'] = 'concise'

    with open("TestData/metadata-placeholder.csv", 'r') as g:
        # This will never change with our consistent formatting
        metadata = pd.read_csv("TestData/metadata-placeholder.csv", header=None, names=('TS_NAME', 'DESCRIPTION',
                                                                                        'UNITS', 'KEYWORDS'), nrows=2)
        ts_name = metadata['TS_NAME'].values[1]
        description = metadata['DESCRIPTION'].values[1]
        units = metadata['UNITS'].values[1]
        # units can be multiple <<
        keywords = metadata['KEYWORDS'].values[1]

    # TS Data consists only Date, Time, Magnitude.
    with open("TestData/data-placeholder.csv", 'r') as f:
        # this can change when introducing multiple scalars (SEE pandas.DataFrame)
        data = pd.read_csv("TestData/data-placeholder.csv", header=0)
        columns = data.columns.values
        # list of column names

        data.dropna(subset=columns, how='all', inplace=True)
        # drop NA rows iff all values are NaN

        print(data[columns[0]].values)
        time = pd.to_datetime(data[columns[0]].values)
        # first column of data is always time. (common practice)
        # convert time to_datetime for better plotting

    data.set_index(time, inplace=True)
    # set index to time for plotting

    # Matplotlib graphing
    for column in columns:
        plt.figure()
        if np.issubdtype(data[column].dtype, np.number):
            # only create a plot if it is numerical data
            plt.plot(data.index, data[column], color=sns.color_palette('Paired')[5], linewidth=.7)
            plt.xlabel(columns[0])
            plt.ylabel(column)
            plt.title(f"{ts_name} - {column}")
            plt.grid(True)
            plt.savefig(f"datafigures/{ts_name}-{column}.png")
            print(f"Saved figure for {column} to file.")
            plt.close()