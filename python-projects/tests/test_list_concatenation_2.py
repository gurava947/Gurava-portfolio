import unittest

from support import run_solution


class ListConcatenation2Test(unittest.TestCase):
    def test_case_01_two_values(self):
        """two values."""
        result = run_solution('list-concatenation-2', '2\nmango\n55\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['apple', '78', '970.03', 'mango', '55']\n")

    def test_case_02_one_value(self):
        """one value."""
        result = run_solution('list-concatenation-2', '1\nkiwi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['apple', '78', '970.03', 'kiwi']\n")


if __name__ == "__main__":
    unittest.main()
