import graph_display as gd
import convert_data as cv
import compare_data as cp
import csv
import chardet




def user_input_bool() -> bool:
    """
    Prompt to get user input for Y/N questions
    """
    while True:
        user_input = input("Enter 'Y' or 'N': ")
        if user_input.upper() == 'Y':
            accepted = True
            return accepted
        elif user_input.upper() == 'N':
            accepted = False
            return accepted
        else:
            print("Invalid input. Please enter 'Y' or 'N'.")



def main():
    """
    Main driver for python module
    """

    # What user type are you?

    #DS/MLE:

    # Select

    #Contributor:
    file_name = "TestData/Type Testing/placeholderfile.xls"
    file_ext = file_name.split('.')[-1]
    supported = True

    #Check if file type is supported
    if file_ext not in cv.read_functions:
        supported = False
        print(f"Unsupported file type {file_ext}. Cannot access full capabilities of website "
              f"(graphical display, DS/MLE forecasting support")


    #if file type is supported, graphically display it
    if supported:
        data = cv.read_functions[file_ext](file_name)

        # Metadata
        print("Please enter in Metadata for the above file:")
        ts_name = input("Enter the TS_NAME: ")
        description = input("Enter the DESCRIPTION: ")
        domains = input("Enter the DOMAINS/HEADERS (comma-separated): ")
        units = input("Enter the UNITS (comma-separated): ")
        keywords = input("Enter the KEYWORDS (comma-separated): ")

        # Format the units and keywords as a comma-separated string
        units_str = ', '.join(units.split(','))
        keywords_str = ', '.join(keywords.split(','))
        domains_str = ', '.join(domains.split(','))

        # Create a dictionary representing the row to be written to the CSV file
        row = {'TS_NAME': ts_name, 'DESCRIPTION': description, 'DOMAINS': domains_str, 'UNITS': units_str,
               'KEYWORDS': keywords_str}

        # Write the row to the CSV file
        with open('TestData/metadata-placeholder.csv', mode='w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=['TS_NAME', 'DESCRIPTION', 'DOMAINS', 'UNITS', 'KEYWORDS'])
            writer.writeheader()
            writer.writerow(row)

        print("Metadata saved to 'metadata-placeholder.csv'.")

        # Use metadata to clean formatting!
        data = cv.clean_headers(data, domains_str)


        # Catch errors by checking format. Prompt user to check their data again to remove white space/leading values, etc.
        if cv.check_data_format(data):
            cv.store_data(data)
            print(f"File {file_name} converted to CSV and saved.\n"
                  f"Split into \"test\" and \"train\" files in the same directory.")


            # Using accepted format data and metadata, we can graphically display the contributors data using matplotlib
            gd.graph()

            accepted = user_input_bool()

            if accepted:
                print("Thank you for contributing to our repository! Have a great day!")
            else:
                print("We're sorry, we have format specifications that may have slipped through our system. "
                      "Please check our formatting specifications and try again")


        else:
            # if not, store data and prompt user to submit data in the future. Warn about use of algorithm comparisons.
            print("Supported file type, unsupported format. Please check to remove trailing 0s, white space, "
                  "and other interferneces. Data should be in the following format:\n"
                  "Header1\tHeader2\tHeader3\t\n Data1 \t Data2 \t Data3 \t\n"
                  " Data1 \t Data2 \t Data3 \t\n  ...  \t  ...  \t  ...  ")




    # convert to csv and store in test/train/data placeholder



if __name__ == "__main__":
    main()