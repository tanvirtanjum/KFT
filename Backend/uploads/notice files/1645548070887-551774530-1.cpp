#include<iostream>
using namespace std;

int main()
{
    int n;
    cout << "Enter Size: ";
    cin >> n;

    int arr[n];

    cout << endl << "Enter Values: " << endl;
    for(int i=0; i<n; i++)
    {
        cout << "Value " << i+1 << ": ";
        cin >> arr[i];
    }

    cout << endl << "Normal Order: " << endl;
    for(int i=0; i<n; i++)
    {
        cout << arr[i] << "\t";
    }

    cout << endl << "Reverse Order: " << endl;
    for(int i=n-1; i>=0; i--)
    {
        cout << arr[i] << "\t";
    }

    int minval = 0;
    for(int i=0; i<n; i++)
    {
        if(i == 0)
        {
            minval = arr[i];
        }

        else
        {
            if(minval > arr[i])
            {
                minval = arr[i];
            }
        }
    }
    cout << endl << "Minimum Value: " << minval <<endl << endl;

    return 0;
}
