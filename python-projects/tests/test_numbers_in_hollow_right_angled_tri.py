import unittest

from support import run_solution


class NumbersInHollowRightAngledTriTest(unittest.TestCase):
    def test_case_01_n_5(self):
        """N = 5."""
        result = run_solution('numbers-in-hollow-right-angled-tri', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 \n1 2\n1   3\n1     4\n1 2 3 4 5 \n')

    def test_case_02_n_2(self):
        """N = 2."""
        result = run_solution('numbers-in-hollow-right-angled-tri', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 \n1 2 \n')


if __name__ == "__main__":
    unittest.main()
