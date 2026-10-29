import unittest

from support import run_solution


class ReverseOrderTest(unittest.TestCase):
    def test_case_01_three_values(self):
        """three values."""
        result = run_solution('reverse-order', '3\ncat\ndog\nant\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ant\ndog\ncat\n')

    def test_case_02_two_values(self):
        """two values."""
        result = run_solution('reverse-order', '2\n10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20\n10\n')


if __name__ == "__main__":
    unittest.main()
