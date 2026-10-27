import unittest

from support import run_solution


class ArmstrongNumbersInInputsTest(unittest.TestCase):
    def test_case_01_2_numbers_153_and_9474(self):
        """2 numbers: 153 and 9474."""
        result = run_solution('armstrong-numbers-in-inputs', '2\n153\n9474\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '153\n9474\n')

    def test_case_02_3_numbers_123_370_9474(self):
        """3 numbers: 123, 370, 9474."""
        result = run_solution('armstrong-numbers-in-inputs', '3\n123\n370\n9474\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '370\n9474\n')


if __name__ == "__main__":
    unittest.main()
