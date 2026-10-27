import unittest

from support import run_solution


class OneColorTest(unittest.TestCase):
    def test_case_01_rrgg(self):
        """RRGG."""
        result = run_solution('one-color', 'RRGG\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_02_rrrr(self):
        """RRRR."""
        result = run_solution('one-color', 'RRRR\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
