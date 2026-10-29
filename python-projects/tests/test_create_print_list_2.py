import unittest

from support import run_solution


class CreatePrintList2Test(unittest.TestCase):
    def test_case_01_ed_reen(self):
        """Red, Green."""
        result = run_solution('create-print-list-2', '2\nRed\nGreen\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['Red', 'Green']\n")

    def test_case_02_one_value(self):
        """one value."""
        result = run_solution('create-print-list-2', '1\nPython\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['Python']\n")


if __name__ == "__main__":
    unittest.main()
