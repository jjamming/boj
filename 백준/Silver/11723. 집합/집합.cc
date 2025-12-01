#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int M;
    cin >> M;

    int S = 0;

    while (M--) {
        string cmd;
        int x;
        cin >> cmd;

        if (cmd == "add") {
            cin >> x;
            S |= (1 << x);
        }
        else if (cmd == "remove") {
            cin >> x;
            S &= ~(1 << x);
        }
        else if (cmd == "check") {
            cin >> x;
            cout << ((S & (1 << x)) ? 1 : 0) << '\n';
        }
        else if (cmd == "toggle") {
            cin >> x;
            S ^= (1 << x);
        }
        else if (cmd == "all") {
            S = (1 << 21) - 2;
        }
        else if (cmd == "empty") {
            S = 0;
        }
    }

    return 0;
}