import unittest

from support import run_solution


class JoinNumbersTest(unittest.TestCase):
    def test_case_01_four_numbers(self):
        """four numbers."""
        result = run_solution('join-numbers', '1 2 3 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1,2,3,4\n')

    def test_case_02_two_numbers(self):
        """two numbers."""
        result = run_solution('join-numbers', '10 20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10,20\n')


if __name__ == "__main__":
    unittest.main()
