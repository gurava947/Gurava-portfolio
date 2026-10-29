import unittest

from support import run_solution


class GreaterThanNTest(unittest.TestCase):
    def test_case_01_threshold_30(self):
        """threshold 30."""
        result = run_solution('greater-than-n', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[32, 93, 71, 50]\n')

    def test_case_02_threshold_100(self):
        """threshold -100."""
        result = run_solution('greater-than-n', '-100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 6, 32, 93, 71, -20, 30, -90, 50]\n')


if __name__ == "__main__":
    unittest.main()
