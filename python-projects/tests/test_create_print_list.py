import unittest

from support import run_solution


class CreatePrintListTest(unittest.TestCase):
    def test_case_01_no_input(self):
        """no input."""
        result = run_solution('create-print-list', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['Rose', 183, 148, 123.64, False]\n")


if __name__ == "__main__":
    unittest.main()
